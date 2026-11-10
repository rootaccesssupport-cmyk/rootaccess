import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  type LaunchCampaignConfig,
  getStoredCampaignConfig,
  saveStoredCampaignConfig,
} from '../data/campaignConfig';
import { ENROLLMENT_PAYMENT_CONFIG } from '../data/enrollmentPaymentConfig';
import { type EnrollmentRequest } from './enrollmentService';

export interface CampaignStats {
  campaignId: string;
  campaignName: string;
  courseSlug: string;
  totalSeats: number;
  enrolledCount: number; // Only verified approved students
  remainingSeats: number;
  isSoldOut: boolean;
  isActive: boolean;
  launchPriceInr: number;
  regularPriceInr: number;
  originalPriceInr: number;
  durationDays: number;
  verifiedRevenueInr: number;
  pendingRequestsCount: number;
  approvedCount: number;
  rejectedCount: number;
  activeStudentsCount: number;
  expiredStudentsCount: number;
}

export interface AccessExpiryDetails {
  isEnrolled: boolean;
  isActive: boolean;
  isExpired: boolean;
  activatedAt?: string;
  expiresAt?: string;
  totalDurationDays: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  formattedCountdown: string;
  formattedExpiryDate: string;
}

const LOCAL_STORAGE_REQUESTS_KEY = 'rootaccess_enrollment_requests';

function getLocalEnrollmentRequests(): EnrollmentRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Generates a unique, professional enrollment reference ID for the Founding 100 offer.
 * Example: FA-100-7X9K2
 */
export function generateEnrollmentId(prefix = 'FA-100'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

export const campaignService = {
  getConfig(): LaunchCampaignConfig {
    return getStoredCampaignConfig();
  },

  updateConfig(updates: Partial<LaunchCampaignConfig>): LaunchCampaignConfig {
    return saveStoredCampaignConfig(updates);
  },

  /**
   * Genuine database-backed live stats for Founding 100.
   * Starts at 0. Counts ONLY approved/verified students for playwright-automation under this campaign.
   */
  async getFounding100Stats(): Promise<CampaignStats> {
    const config = this.getConfig();
    let requests: EnrollmentRequest[] = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enrollment_requests')
          .select('*')
          .eq('course_slug', config.courseSlug);

        if (!error && data) {
          requests = data as EnrollmentRequest[];
        }
      } catch (err) {
        console.warn('Failed to query Supabase for campaign stats, falling back to local:', err);
      }
    }

    if (requests.length === 0) {
      // Fallback to local storage
      const local = getLocalEnrollmentRequests();
      requests = local.filter((r) => r.course_slug === config.courseSlug);
    }

    // Filter requests matching the campaign:
    // Either campaign_tag === 'founding-100' or (no campaign_tag set and priced at 149 / playwright launch)
    const campaignRequests = requests.filter((r) => {
      if (r.campaign_tag) {
        return r.campaign_tag === 'founding-100';
      }
      // If legacy or direct request for playwright-automation
      return true;
    });

    const now = new Date().getTime();

    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;
    let activeStudentsCount = 0;
    let expiredStudentsCount = 0;

    campaignRequests.forEach((req) => {
      if (req.status === 'approved') {
        approvedCount++;
        if (req.expires_at) {
          const expTime = new Date(req.expires_at).getTime();
          if (expTime > now) {
            activeStudentsCount++;
          } else {
            expiredStudentsCount++;
          }
        } else {
          // If approved without explicit expiry, treat as active for duration
          activeStudentsCount++;
        }
      } else if (req.status === 'pending') {
        pendingCount++;
      } else if (req.status === 'rejected') {
        rejectedCount++;
      }
    });

    const enrolledCount = approvedCount;
    const remainingSeats = Math.max(0, config.maxSeats - enrolledCount);
    const isSoldOut = enrolledCount >= config.maxSeats;
    const verifiedRevenueInr = enrolledCount * config.launchPriceInr;

    return {
      campaignId: config.id,
      campaignName: config.campaignName,
      courseSlug: config.courseSlug,
      totalSeats: config.maxSeats,
      enrolledCount,
      remainingSeats,
      isSoldOut,
      isActive: config.isActive,
      launchPriceInr: config.launchPriceInr,
      regularPriceInr: config.regularPriceInr,
      originalPriceInr: config.originalPriceInr,
      durationDays: config.durationDays,
      verifiedRevenueInr,
      pendingRequestsCount: pendingCount,
      approvedCount,
      rejectedCount,
      activeStudentsCount,
      expiredStudentsCount,
    };
  },

  /**
   * Generates WhatsApp prefilled link with unique Enrollment ID and ₹149 pricing.
   */
  getWhatsAppPaymentUrl(params: {
    userName: string;
    userEmail: string;
    enrollmentId: string;
  }): string {
    const config = this.getConfig();
    const message = [
      `Hi RootAccess Admin,`,
      ``,
      `I want to enroll in "${config.courseTitle}" under the *${config.campaignName}*!`,
      ``,
      `📋 *My Enrollment Details:*`,
      `- Enrollment ID: ${params.enrollmentId}`,
      `- Student Name: ${params.userName || 'Student'}`,
      `- Registered Email: ${params.userEmail}`,
      `- Course: ${config.courseTitle}`,
      `- Launch Offer Price: ₹${config.launchPriceInr} (30 Days Full Access)`,
      ``,
      `Please share your UPI ID / QR code so I can complete the payment and get my 30-day access activated. Thank you!`,
    ].join('\n');

    return `https://wa.me/${ENROLLMENT_PAYMENT_CONFIG.whatsappNumberRaw}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Calculates detailed access countdown and active/expired status for a given expiry date.
   */
  calculateAccessDetails(
    activatedAt?: string | null,
    expiresAt?: string | null,
    durationDays = 30
  ): AccessExpiryDetails {
    if (!expiresAt && !activatedAt) {
      return {
        isEnrolled: false,
        isActive: false,
        isExpired: false,
        totalDurationDays: durationDays,
        daysRemaining: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
        secondsRemaining: 0,
        formattedCountdown: 'Not Enrolled',
        formattedExpiryDate: 'N/A',
      };
    }

    // If activatedAt exists but expiresAt is missing, compute expiresAt
    let effectiveExpiresAt = expiresAt;
    if (!effectiveExpiresAt && activatedAt) {
      const actTime = new Date(activatedAt).getTime();
      effectiveExpiresAt = new Date(actTime + durationDays * 24 * 60 * 60 * 1000).toISOString();
    }

    const now = new Date().getTime();
    const expiryTime = effectiveExpiresAt ? new Date(effectiveExpiresAt).getTime() : now;
    const diffMs = expiryTime - now;
    const isExpired = diffMs <= 0;
    const isActive = !isExpired;

    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedCountdown = isExpired
      ? 'Access Expired'
      : `${days} Days : ${hours} Hours : ${minutes} Mins Remaining`;

    const formattedExpiryDate = effectiveExpiresAt
      ? new Date(effectiveExpiresAt).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'N/A';

    return {
      isEnrolled: true,
      isActive,
      isExpired,
      activatedAt: activatedAt || undefined,
      expiresAt: effectiveExpiresAt || undefined,
      totalDurationDays: durationDays,
      daysRemaining: days,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      secondsRemaining: seconds,
      formattedCountdown,
      formattedExpiryDate,
    };
  },
};
