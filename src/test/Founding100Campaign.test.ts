import { describe, it, expect, beforeEach } from 'vitest';
import {
  DEFAULT_FOUNDING_500_CONFIG,
  DEFAULT_FOUNDING_100_CONFIG,
  getStoredCampaignConfig,
  saveStoredCampaignConfig,
  type LaunchCampaignConfig,
} from '../data/campaignConfig';
import {
  generateEnrollmentId,
  campaignService,
} from '../services/campaignService';
import { enrollmentService, type EnrollmentRequest } from '../services/enrollmentService';
import { getCoursePriceDetails } from '../data/enrollmentPaymentConfig';

describe('Founding 500 Students Launch Offer Campaign', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Campaign Configuration', () => {
    it('should have default Founding 500 parameters', () => {
      expect(DEFAULT_FOUNDING_500_CONFIG.id).toBe('playwright-founding-500');
      expect(DEFAULT_FOUNDING_500_CONFIG.campaignName).toBe('FOUNDING 500 STUDENTS');
      expect(DEFAULT_FOUNDING_500_CONFIG.courseSlug).toBe('playwright-automation');
      expect(DEFAULT_FOUNDING_500_CONFIG.launchPriceInr).toBe(149);
      expect(DEFAULT_FOUNDING_500_CONFIG.regularPriceInr).toBe(649);
      expect(DEFAULT_FOUNDING_500_CONFIG.originalPriceInr).toBe(1599);
      expect(DEFAULT_FOUNDING_500_CONFIG.maxSeats).toBe(500);
      expect(DEFAULT_FOUNDING_500_CONFIG.durationDays).toBe(30);
      expect(DEFAULT_FOUNDING_500_CONFIG.isActive).toBe(true);
    });

    it('should provide backwards-compatible alias DEFAULT_FOUNDING_100_CONFIG', () => {
      expect(DEFAULT_FOUNDING_100_CONFIG.maxSeats).toBe(500);
    });

    it('should automatically migrate legacy 100-seat localStorage config to 500 seats', () => {
      localStorage.setItem('rootaccess_campaign_config_playwright', JSON.stringify({
        id: 'playwright-founding-100',
        maxSeats: 100,
        campaignName: 'FOUNDING 100 STUDENTS',
      }));
      const loaded = getStoredCampaignConfig();
      expect(loaded.maxSeats).toBe(500);
      expect(loaded.campaignName).toBe('FOUNDING 500 STUDENTS');
    });

    it('should persist and load modified campaign settings', () => {
      const customConfig: Partial<LaunchCampaignConfig> = {
        launchPriceInr: 199,
        maxSeats: 450,
      };
      saveStoredCampaignConfig(customConfig);
      const loaded = getStoredCampaignConfig();
      expect(loaded.launchPriceInr).toBe(199);
      expect(loaded.maxSeats).toBe(450);
    });
  });

  describe('Campaign Service & Utilities', () => {
    it('should generate unique enrollment IDs prefixed with FA-500-', () => {
      const id1 = generateEnrollmentId();
      const id2 = generateEnrollmentId();
      expect(id1).toMatch(/^FA-500-[A-Z0-9]{5}$/);
      expect(id2).toMatch(/^FA-500-[A-Z0-9]{5}$/);
      expect(id1).not.toBe(id2);
    });

    it('should build WhatsApp payment URL with course, enrollment ID, and price', () => {
      const url = campaignService.getWhatsAppPaymentUrl({
        userName: 'Pavan Tester',
        userEmail: 'pavan@test.com',
        enrollmentId: 'FA-500-TEST1',
      });
      expect(url).toContain('https://wa.me/919741243048');
      expect(url).toContain('FA-500-TEST1');
      expect(url).toContain('149');
      expect(url).toContain('Playwright%20Automation');
    });

    it('should correctly calculate active access countdown when within 30 days', () => {
      const now = new Date();
      const activatedAt = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(); // 2 days ago
      const expiresAt = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000 + 10000).toISOString(); // ~28 days left

      const details = campaignService.calculateAccessDetails(activatedAt, expiresAt);
      expect(details.isExpired).toBe(false);
      expect(details.isActive).toBe(true);
      expect(details.daysRemaining).toBe(28);
      expect(details.formattedCountdown).toContain('28 Days');
    });

    it('should correctly detect expired access when past 30 days', () => {
      const now = new Date();
      const activatedAt = new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(); // 35 days ago
      const expiresAt = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(); // Expired 5 days ago

      const details = campaignService.calculateAccessDetails(activatedAt, expiresAt);
      expect(details.isExpired).toBe(true);
      expect(details.isActive).toBe(false);
      expect(details.daysRemaining).toBe(0);
      expect(details.formattedCountdown).toBe('Access Expired');
    });
  });

  describe('Live Database-backed Seat Counter', () => {
    it('should start at 0 when there are no approved enrollments', async () => {
      const stats = await campaignService.getFounding500Stats();
      expect(stats.enrolledCount).toBe(0);
      expect(stats.remainingSeats).toBe(500);
      expect(stats.totalSeats).toBe(500);
      expect(stats.isSoldOut).toBe(false);
    });

    it('should count only approved enrollments and preserve historical founding-100 entries', async () => {
      const mockRequests: EnrollmentRequest[] = [
        {
          id: 'req-1',
          user_id: 'user-1',
          user_email: 'user1@example.com',
          user_name: 'User 1',
          course_slug: 'playwright-automation',
          course_title: 'Playwright Automation',
          upi_reference: 'UTR111',
          amount_paid: 149,
          campaign_tag: 'founding-500',
          status: 'pending',
          requested_at: new Date().toISOString(),
        },
        {
          id: 'req-2',
          user_id: 'user-2',
          user_email: 'user2@example.com',
          user_name: 'User 2',
          course_slug: 'playwright-automation',
          course_title: 'Playwright Automation',
          upi_reference: 'UTR222',
          amount_paid: 149,
          campaign_tag: 'founding-100', // Historical record preserved!
          status: 'approved',
          requested_at: new Date().toISOString(),
        },
        {
          id: 'req-3',
          user_id: 'user-3',
          user_email: 'user3@example.com',
          user_name: 'User 3',
          course_slug: 'playwright-automation',
          course_title: 'Playwright Automation',
          upi_reference: 'UTR333',
          amount_paid: 149,
          campaign_tag: 'founding-500',
          status: 'rejected',
          requested_at: new Date().toISOString(),
        },
      ];

      localStorage.setItem('rootaccess_enrollment_requests', JSON.stringify(mockRequests));

      const stats = await campaignService.getFounding500Stats();
      expect(stats.enrolledCount).toBe(1);
      expect(stats.remainingSeats).toBe(499);
      expect(stats.isSoldOut).toBe(false);
    });

    it('should mark campaign as sold out when 500 seats are filled', async () => {
      const mockApproved: EnrollmentRequest[] = Array.from({ length: 500 }, (_, i) => ({
        id: `req-${i}`,
        user_id: `user-${i}`,
        user_email: `user${i}@example.com`,
        user_name: `User ${i}`,
        course_slug: 'playwright-automation',
        course_title: 'Playwright Automation',
        upi_reference: `UTR${i}`,
        amount_paid: 149,
        campaign_tag: i < 50 ? 'founding-100' : 'founding-500',
        status: 'approved' as const,
        requested_at: new Date().toISOString(),
      }));

      localStorage.setItem('rootaccess_enrollment_requests', JSON.stringify(mockApproved));

      const stats = await campaignService.getFounding500Stats();
      expect(stats.enrolledCount).toBe(500);
      expect(stats.remainingSeats).toBe(0);
      expect(stats.isSoldOut).toBe(true);
    });
  });

  describe('Enrollment Approval & Atomic 30-Day Expiry Activation', () => {
    it('should set activated_at and expires_at (+30 days) upon admin approval', async () => {
      // 1. Submit request
      const submitResult = await enrollmentService.submitRequest({
        userId: 'student-abc',
        userEmail: 'student@example.com',
        userName: 'Student ABC',
        courseSlug: 'playwright-automation',
        courseTitle: 'Playwright Automation',
        upiReference: 'UTR998877',
        studentNotes: 'Founding 500 student',
        campaignTag: 'founding-500',
        enrollmentId: 'FA-500-TESTX',
        amountPaid: 149,
        accessDurationDays: 30,
      });

      expect(submitResult.success).toBe(true);
      const reqId = submitResult.request!.id;

      // 2. Admin approves request
      const approveResult = await enrollmentService.approveRequest(reqId, 'admin-1');
      expect(approveResult.success).toBe(true);

      // 3. Verify access record
      const access = enrollmentService.getStudentCourseAccess('student-abc', 'playwright-automation');
      expect(access).not.toBeNull();
      expect(access?.enrolled).toBe(true);
      expect(access?.isExpired).toBe(false);
      expect(access?.durationDays).toBe(30);
      expect(access?.activatedAt).toBeDefined();
      expect(access?.expiresAt).toBeDefined();

      const activated = new Date(access!.activatedAt!).getTime();
      const expires = new Date(access!.expiresAt!).getTime();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      expect(Math.abs(expires - (activated + thirtyDaysMs))).toBeLessThan(1000); // exactly 30 days later

      // 4. Verify isStudentAccessActive
      const isActive = enrollmentService.isStudentAccessActive('student-abc', 'playwright-automation');
      expect(isActive).toBe(true);
    });

    it('should prevent approving more than maxSeats (500) students for the campaign', async () => {
      // Fill 500 seats
      const mockApproved: EnrollmentRequest[] = Array.from({ length: 500 }, (_, i) => ({
        id: `seat-${i}`,
        user_id: `student-${i}`,
        user_email: `student${i}@example.com`,
        user_name: `Student ${i}`,
        course_slug: 'playwright-automation',
        course_title: 'Playwright Automation',
        upi_reference: `UTR${i}`,
        amount_paid: 149,
        campaign_tag: 'founding-500',
        status: 'approved' as const,
        requested_at: new Date().toISOString(),
      }));

      // Add 501st pending request
      const pendingReq: EnrollmentRequest = {
        id: 'seat-501',
        user_id: 'student-501',
        user_email: 'student501@example.com',
        user_name: 'Student 501',
        course_slug: 'playwright-automation',
        course_title: 'Playwright Automation',
        upi_reference: 'UTR501',
        amount_paid: 149,
        campaign_tag: 'founding-500',
        status: 'pending',
        requested_at: new Date().toISOString(),
      };

      localStorage.setItem('rootaccess_enrollment_requests', JSON.stringify([...mockApproved, pendingReq]));

      // Attempt to approve 501st request
      const result = await enrollmentService.approveRequest('seat-501', 'admin-1');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Cannot approve: Founding 500 seats limit reached');
    });
  });

  describe('Course Pricing Display', () => {
    it('should return Founding 500 ₹149 pricing for playwright-automation when active', () => {
      const pricing = getCoursePriceDetails('playwright-automation');
      expect(pricing.inr).toBe(149);
      expect(pricing.originalInr).toBe(1599);
      expect(pricing.discountPercent).toBe(91);
      expect(pricing.formattedInr).toBe('₹149');
    });
  });
});
