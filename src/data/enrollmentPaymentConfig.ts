export interface CoursePriceInfo {
  inr: number;
  originalInr: number;
  label: string;
  isLaunchOffer?: boolean;
}

export interface CoursePriceDetails extends CoursePriceInfo {
  savings: number;
  discountPercent: number;
  formattedInr: string;
  formattedOriginalInr: string;
  formattedSavings: string;
}

export const ENROLLMENT_PAYMENT_CONFIG = {
  adminEmail: 'pavankalyan.d@gmail.com',
  whatsappNumber: '+919741243048',
  whatsappNumberRaw: '919741243048',
  supportEmail: 'rootaccess.support@gmail.com',

  // Standard course pricing (INR)
  pricing: {
    'manual-qa-fundamentals': { inr: 299, originalInr: 599, label: 'Manual Testing', isLaunchOffer: true },
    'manual-testing': { inr: 299, originalInr: 599, label: 'Manual Testing', isLaunchOffer: true },
    'playwright-automation': { inr: 649, originalInr: 1599, label: 'Playwright Automation with JavaScript + AI', isLaunchOffer: true },
    'sql-for-qa-engineers': { inr: 299, originalInr: 599, label: 'SQL', isLaunchOffer: true },
    'api-testing-postman': { inr: 299, originalInr: 599, label: 'API Testing', isLaunchOffer: true },
    'ai-prompt-engineering': { inr: 299, originalInr: 599, label: 'AI Fundamentals & Prompt Engineering', isLaunchOffer: true },
    'devops-engineering': { inr: 3499, originalInr: 6999, label: 'DevOps Engineering Academy', isLaunchOffer: false },
  } as Record<string, CoursePriceInfo>,

  getWhatsAppPaymentUrl: (courseSlug: string, courseTitle: string, userEmail: string, userName: string) => {
    const details = getCoursePriceDetails(courseSlug);
    const text = `Hi RootAccess Admin,\n\nI want to enroll in "${courseTitle}".\n\nMy Details:\n- Name: ${userName || 'Student'}\n- Registered Email: ${userEmail}\n- Course: ${courseTitle}\n- Price: ${details.formattedInr}${details.isLaunchOffer ? ' (Launch Offer)' : ''}\n\nPlease share your UPI ID / QR code so I can complete payment and get access to the course!`;
    return `https://wa.me/${ENROLLMENT_PAYMENT_CONFIG.whatsappNumberRaw}?text=${encodeURIComponent(text)}`;
  },

  isAdminEmail: (email?: string | null): boolean => {
    if (!email) return false;
    return email.trim().toLowerCase() === ENROLLMENT_PAYMENT_CONFIG.adminEmail.toLowerCase();
  },
};

/**
 * Single source of truth for course pricing, discount percentage, and amount saved.
 */
export const getCoursePriceDetails = (courseSlug: string): CoursePriceDetails => {
  const priceInfo: CoursePriceInfo = ENROLLMENT_PAYMENT_CONFIG.pricing[courseSlug] || {
    inr: 299,
    originalInr: 599,
    label: 'Course',
    isLaunchOffer: false,
  };

  const savings = Math.max(0, priceInfo.originalInr - priceInfo.inr);
  const discountPercent =
    priceInfo.originalInr > 0 ? Math.round((savings / priceInfo.originalInr) * 100) : 0;

  return {
    ...priceInfo,
    savings,
    discountPercent,
    formattedInr: `₹${priceInfo.inr.toLocaleString('en-IN')}`,
    formattedOriginalInr: `₹${priceInfo.originalInr.toLocaleString('en-IN')}`,
    formattedSavings: `₹${savings.toLocaleString('en-IN')}`,
  };
};
