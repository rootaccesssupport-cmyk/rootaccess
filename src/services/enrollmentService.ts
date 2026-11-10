import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getStoredCampaignConfig } from '../data/campaignConfig';

export interface EnrollmentRequest {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  course_slug: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  upi_reference?: string;
  student_notes?: string;
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  // Founding 100 Campaign and Access Tracking
  campaign_tag?: string;
  enrollment_id?: string;
  amount_paid?: number;
  access_duration_days?: number;
  activated_at?: string;
  expires_at?: string;
}

export interface StudentCourseAccess {
  courseSlug: string;
  enrolled: boolean;
  isActive: boolean;
  isExpired: boolean;
  campaignTag?: string;
  enrollmentId?: string;
  amountPaid?: number;
  activatedAt?: string;
  expiresAt?: string;
  durationDays?: number;
}

const LOCAL_STORAGE_REQUESTS_KEY = 'rootaccess_enrollment_requests';
const LOCAL_STORAGE_ACCESS_PREFIX = 'rootaccess_course_access_';


function getLocalRequests(): EnrollmentRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalRequests(reqs: EnrollmentRequest[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(reqs));
  } catch (err) {
    console.error('Failed to save local enrollment requests:', err);
  }
}

function getLocalStudentAccess(userId: string): Record<string, StudentCourseAccess> {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_ACCESS_PREFIX}${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalStudentAccess(userId: string, accessMap: Record<string, StudentCourseAccess>) {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_ACCESS_PREFIX}${userId}`, JSON.stringify(accessMap));
  } catch (err) {
    console.error('Failed to save student course access:', err);
  }
}

export const enrollmentService = {
  // Submit or update a student's enrollment request
  async submitRequest(params: {
    userId: string;
    userEmail: string;
    userName: string;
    courseSlug: string;
    courseTitle: string;
    upiReference?: string;
    studentNotes?: string;
    campaignTag?: string;
    enrollmentId?: string;
    amountPaid?: number;
    accessDurationDays?: number;
  }): Promise<{ success: boolean; error?: string; request?: EnrollmentRequest }> {
    const normalizedSlug = params.courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : params.courseSlug;

    const campaignTag =
      params.campaignTag ||
      (normalizedSlug === 'playwright-automation' ? 'founding-100' : undefined);

    const amountPaid =
      params.amountPaid !== undefined
        ? params.amountPaid
        : campaignTag === 'founding-100'
        ? 149
        : undefined;

    const accessDurationDays =
      params.accessDurationDays !== undefined
        ? params.accessDurationDays
        : campaignTag === 'founding-100'
        ? 30
        : undefined;

    const enrollmentId =
      params.enrollmentId ||
      (campaignTag === 'founding-100'
        ? `FA-100-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
        : undefined);

    const newRequest: EnrollmentRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user_id: params.userId,
      user_email: params.userEmail,
      user_name: params.userName,
      course_slug: normalizedSlug,
      course_title: params.courseTitle,
      status: 'pending',
      upi_reference: params.upiReference || '',
      student_notes: params.studentNotes || '',
      requested_at: new Date().toISOString(),
      campaign_tag: campaignTag,
      enrollment_id: enrollmentId,
      amount_paid: amountPaid,
      access_duration_days: accessDurationDays,
    };

    // Save locally
    const existing = getLocalRequests();
    const filtered = existing.filter((r) => !(r.user_id === params.userId && r.course_slug === normalizedSlug));
    saveLocalRequests([newRequest, ...filtered]);

    // Sync to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enrollment_requests')
          .upsert(
            {
              user_id: params.userId,
              user_email: params.userEmail,
              user_name: params.userName,
              course_slug: normalizedSlug,
              course_title: params.courseTitle,
              status: 'pending',
              upi_reference: params.upiReference || '',
              student_notes: params.studentNotes || '',
              requested_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,course_slug' }
          )
          .select()
          .maybeSingle();

        if (error) {
          console.warn('Supabase enrollment_requests upsert warning:', error.message);
        } else if (data) {
          const merged = { ...newRequest, ...(data as EnrollmentRequest) };
          return { success: true, request: merged };
        }
      } catch (err: any) {
        console.warn('Network error syncing enrollment request:', err.message);
      }
    }

    return { success: true, request: newRequest };
  },

  // Get active student request for a specific course
  async getStudentRequest(userId: string, courseSlug: string): Promise<EnrollmentRequest | null> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;

    // Check local storage first
    const local = getLocalRequests().find((r) => r.user_id === userId && r.course_slug === normalizedSlug);

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('enrollment_requests')
          .select('*')
          .eq('user_id', userId)
          .eq('course_slug', normalizedSlug)
          .maybeSingle();

        if (data) {
          return { ...local, ...(data as EnrollmentRequest) };
        }
      } catch {
        // fallback to local
      }
    }

    return local || null;
  },

  // Admin: Get all requests
  async getAllRequests(): Promise<EnrollmentRequest[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('enrollment_requests')
          .select('*')
          .order('requested_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Merge with local requests to retain local campaign tags/metadata
          const local = getLocalRequests();
          const merged = data.map((remote: any) => {
            const loc = local.find((l) => l.id === remote.id || (l.user_id === remote.user_id && l.course_slug === remote.course_slug));
            return {
              ...loc,
              ...remote,
              campaign_tag: remote.campaign_tag || loc?.campaign_tag,
              enrollment_id: remote.enrollment_id || loc?.enrollment_id,
              amount_paid: remote.amount_paid || loc?.amount_paid,
              activated_at: remote.activated_at || loc?.activated_at,
              expires_at: remote.expires_at || loc?.expires_at,
              access_duration_days: remote.access_duration_days || loc?.access_duration_days,
            } as EnrollmentRequest;
          });
          return merged;
        }
      } catch (err) {
        console.warn('Failed to fetch from supabase enrollment_requests:', err);
      }
    }

    return getLocalRequests();
  },

  // Admin: Approve request and grant course enrollment (with optional UTR / notes)
  async approveRequest(
    requestId: string,
    adminEmail: string,
    updatedUpiRef?: string,
    adminNotes?: string
  ): Promise<{ success: boolean; error?: string }> {
    // 1. Find request
    let target: EnrollmentRequest | null = null;
    const local = getLocalRequests();
    target = local.find((r) => r.id === requestId) || null;

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('enrollment_requests')
          .select('*')
          .eq('id', requestId)
          .maybeSingle();
        if (data) target = { ...target, ...(data as EnrollmentRequest) };
      } catch {
        // fallback
      }
    }

    if (!target) {
      return { success: false, error: 'Request not found' };
    }

    const courseToGrant = target.course_slug;
    const targetUserId = target.user_id;
    const campaignConfig = getStoredCampaignConfig();
    const isFounding100 =
      target.campaign_tag === 'founding-100' ||
      (courseToGrant === 'playwright-automation' && (target.amount_paid === 149 || !target.campaign_tag));

    // Atomic seat check for Founding 100 Campaign
    if (isFounding100) {
      const allCurrent = await this.getAllRequests();
      const currentApprovedFoundingCount = allCurrent.filter(
        (r) =>
          r.status === 'approved' &&
          r.course_slug === 'playwright-automation' &&
          (r.campaign_tag === 'founding-100' || r.amount_paid === 149 || !r.campaign_tag) &&
          r.id !== requestId
      ).length;

      if (currentApprovedFoundingCount >= campaignConfig.maxSeats) {
        return {
          success: false,
          error: `Cannot approve: Founding 100 seats limit reached (${campaignConfig.maxSeats}/${campaignConfig.maxSeats}). Offer is sold out!`,
        };
      }
    }

    const finalUpiRef = updatedUpiRef !== undefined ? updatedUpiRef.trim() : (target.upi_reference || '');
    const finalNotes = adminNotes !== undefined ? adminNotes.trim() : (target.student_notes || '');

    // Compute activation and 30-day expiry
    const now = new Date();
    const activatedAt = now.toISOString();
    const durationDays = target.access_duration_days || (isFounding100 ? campaignConfig.durationDays : 30);
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();
    const campaignTag = isFounding100 ? 'founding-100' : target.campaign_tag;
    const amountPaid = target.amount_paid || (isFounding100 ? campaignConfig.launchPriceInr : undefined);
    const enrollmentId = target.enrollment_id || (isFounding100 ? `FA-100-${Math.random().toString(36).substring(2, 7).toUpperCase()}` : undefined);

    // 2. Mark request as approved
    const updatedLocal = local.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: 'approved' as const,
            upi_reference: finalUpiRef,
            student_notes: finalNotes,
            reviewed_at: activatedAt,
            reviewed_by: adminEmail,
            campaign_tag: campaignTag,
            enrollment_id: enrollmentId,
            amount_paid: amountPaid,
            access_duration_days: durationDays,
            activated_at: activatedAt,
            expires_at: expiresAt,
          }
        : r
    );
    saveLocalRequests(updatedLocal);

    // 3. Save student access record locally
    const accessMap = getLocalStudentAccess(targetUserId);
    accessMap[courseToGrant] = {
      courseSlug: courseToGrant,
      enrolled: true,
      isActive: true,
      isExpired: false,
      campaignTag,
      enrollmentId,
      amountPaid,
      activatedAt,
      expiresAt,
      durationDays,
    };
    saveLocalStudentAccess(targetUserId, accessMap);

    // 4. Grant course access to target user in public.profiles
    if (isSupabaseConfigured) {
      try {
        // Update request row
        await supabase
          .from('enrollment_requests')
          .update({
            status: 'approved',
            upi_reference: finalUpiRef,
            student_notes: finalNotes,
            reviewed_at: activatedAt,
            reviewed_by: adminEmail,
          })
          .eq('id', requestId);

        // Fetch existing enrolled courses for this student
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrolled_courses')
          .eq('id', targetUserId)
          .maybeSingle();

        const currentEnrolled: string[] = profile?.enrolled_courses || [];
        if (!currentEnrolled.includes(courseToGrant)) {
          const updated = [...currentEnrolled, courseToGrant];
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetUserId);
        }
      } catch (err: any) {
        console.error('Error granting enrollment in Supabase:', err);
      }
    }

    // Update local storage progress for target user as well
    try {
      const userStorageKey = `rootaccess_progress_${targetUserId}`;
      const userProgressRaw = localStorage.getItem(userStorageKey);
      if (userProgressRaw) {
        const parsed = JSON.parse(userProgressRaw);
        const enrolled = parsed.enrolledCourses || [];
        if (!enrolled.includes(courseToGrant)) {
          parsed.enrolledCourses = [...enrolled, courseToGrant];
          localStorage.setItem(userStorageKey, JSON.stringify(parsed));
        }
      }
    } catch {
      // ignore
    }

    return { success: true };
  },

  // Get student access info for a course
  getStudentCourseAccess(userId: string, courseSlug: string): StudentCourseAccess | null {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;
    const accessMap = getLocalStudentAccess(userId);
    const record = accessMap[normalizedSlug];

    if (record) {
      const now = Date.now();
      const isExpired = record.expiresAt ? new Date(record.expiresAt).getTime() <= now : false;
      return {
        ...record,
        isExpired,
        isActive: !isExpired,
      };
    }

    // If not in accessMap, check approved requests
    const local = getLocalRequests();
    const req = local.find(
      (r) => r.user_id === userId && r.course_slug === normalizedSlug && r.status === 'approved'
    );
    if (req) {
      const now = Date.now();
      const expiresAt = req.expires_at || (req.activated_at ? new Date(new Date(req.activated_at).getTime() + 30 * 86400000).toISOString() : undefined);
      const isExpired = expiresAt ? new Date(expiresAt).getTime() <= now : false;

      return {
        courseSlug: normalizedSlug,
        enrolled: true,
        isActive: !isExpired,
        isExpired,
        campaignTag: req.campaign_tag,
        enrollmentId: req.enrollment_id,
        amountPaid: req.amount_paid,
        activatedAt: req.activated_at,
        expiresAt,
        durationDays: req.access_duration_days || 30,
      };
    }

    return null;
  },

  // Synchronous active access checker
  isStudentAccessActive(userId: string, courseSlug: string): boolean {
    const access = this.getStudentCourseAccess(userId, courseSlug);
    if (!access) return false;
    return access.isActive;
  },


  // Admin: Reject request
  async rejectRequest(requestId: string, adminEmail: string): Promise<{ success: boolean; error?: string }> {
    const local = getLocalRequests();
    const updated = local.map((r) =>
      r.id === requestId
        ? { ...r, status: 'rejected' as const, reviewed_at: new Date().toISOString(), reviewed_by: adminEmail }
        : r
    );
    saveLocalRequests(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('enrollment_requests')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by: adminEmail,
          })
          .eq('id', requestId);
      } catch (err: any) {
        console.warn('Error rejecting request in Supabase:', err.message);
      }
    }

    return { success: true };
  },

  // Admin: Directly grant access to a student by email without prior request (with UTR & notes)
  async directGrantByEmail(
    email: string,
    courseSlug: string,
    adminEmail: string,
    upiReference?: string,
    notes?: string
  ): Promise<{ success: boolean; message: string }> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;
    const finalUpiRef = upiReference ? upiReference.trim() : '';
    const finalNotes = notes ? notes.trim() : 'Directly granted by administrator';

    if (isSupabaseConfigured) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, full_name, enrolled_courses')
          .eq('email', email.trim().toLowerCase())
          .maybeSingle();

        if (error || !profile) {
          return { success: false, message: `No registered account found with email: ${email}` };
        }

        const currentEnrolled: string[] = profile.enrolled_courses || [];
        const isAlreadyEnrolled = currentEnrolled.includes(normalizedSlug);

        if (!isAlreadyEnrolled) {
          const updated = [...currentEnrolled, normalizedSlug];
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);
        }

        // Upsert approved request with UTR
        await supabase.from('enrollment_requests').upsert({
          user_id: profile.id,
          user_email: profile.email,
          user_name: profile.full_name,
          course_slug: normalizedSlug,
          course_title: normalizedSlug,
          status: 'approved',
          upi_reference: finalUpiRef,
          student_notes: finalNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminEmail,
        }, { onConflict: 'user_id,course_slug' });

        return {
          success: true,
          message: `Successfully granted "${normalizedSlug}" to ${profile.full_name} (${profile.email})${finalUpiRef ? ` [UTR: ${finalUpiRef}]` : ''}!`,
        };
      } catch (err: any) {
        return { success: false, message: `Error: ${err.message}` };
      }
    }

    return { success: false, message: 'Database not connected.' };
  },

  // Admin: Revoke specific course access from a user
  async revokeAccess(userId: string, courseSlug: string): Promise<{ success: boolean; message: string }> {
    const normalizedSlug = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;

    if (isSupabaseConfigured) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('enrolled_courses')
          .eq('id', userId)
          .maybeSingle();

        if (profile) {
          const updated = (profile.enrolled_courses || []).filter((s: string) => s !== normalizedSlug);
          await supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }

        await supabase
          .from('enrollment_requests')
          .delete()
          .eq('user_id', userId)
          .eq('course_slug', normalizedSlug);

        // Update local storage
        const local = getLocalRequests();
        saveLocalRequests(local.filter((r) => !(r.user_id === userId && r.course_slug === normalizedSlug)));

        return { success: true, message: `Access to "${normalizedSlug}" has been revoked.` };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }

    const local = getLocalRequests();
    saveLocalRequests(local.filter((r) => !(r.user_id === userId && r.course_slug === normalizedSlug)));
    return { success: true, message: 'Access revoked locally.' };
  },

  // Admin: Revoke ALL course access from a user
  async revokeAllAccess(userId: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('profiles')
          .update({
            enrolled_courses: [],
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        await supabase
          .from('enrollment_requests')
          .delete()
          .eq('user_id', userId);

        const local = getLocalRequests();
        saveLocalRequests(local.filter((r) => r.user_id !== userId));

        return { success: true, message: 'All course access revoked for this student.' };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }

    const local = getLocalRequests();
    saveLocalRequests(local.filter((r) => r.user_id !== userId));
    return { success: true, message: 'All course access revoked locally.' };
  },

  // Admin: Revoke access by student email
  async revokeAccessByEmail(email: string, courseSlug?: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, enrolled_courses')
          .eq('email', email.trim().toLowerCase())
          .maybeSingle();

        if (error || !profile) {
          return { success: false, message: `No registered account found with email: ${email}` };
        }

        if (!courseSlug || courseSlug === 'all') {
          return this.revokeAllAccess(profile.id);
        } else {
          return this.revokeAccess(profile.id, courseSlug);
        }
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }
    return { success: false, message: 'Database not connected.' };
  },
};
