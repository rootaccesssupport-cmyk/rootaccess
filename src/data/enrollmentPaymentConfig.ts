export const ENROLLMENT_PAYMENT_CONFIG = {
  adminEmail: 'pavankalyan.d@gmail.com',
  whatsappNumber: '+919741243048',
  whatsappNumberRaw: '919741243048',
  supportEmail: 'pavankalyan.d@gmail.com',

  // Standard course pricing (INR)
  pricing: {
    'manual-qa-fundamentals': { inr: 1999, originalInr: 3999, label: 'Manual QA in 5 Days: Interview Prep' },
    'manual-testing': { inr: 1999, originalInr: 3999, label: 'Manual QA in 5 Days: Interview Prep' },
    'playwright-automation': { inr: 2999, originalInr: 5999, label: 'Playwright Automation with JavaScript + AI' },
    'devops-engineering': { inr: 3499, originalInr: 6999, label: 'DevOps Engineering Academy' },
    'sql-for-qa-engineers': { inr: 1499, originalInr: 2999, label: 'SQL & Database Audits for QA' },
    'api-testing-postman': { inr: 1499, originalInr: 2999, label: 'API Testing with Postman' },
    'qa-interview-mastery': { inr: 1499, originalInr: 2999, label: 'QA Technical Interview Mastery' },
  } as Record<string, { inr: number; originalInr: number; label: string }>,

  getWhatsAppPaymentUrl: (courseSlug: string, courseTitle: string, userEmail: string, userName: string) => {
    const priceInfo = ENROLLMENT_PAYMENT_CONFIG.pricing[courseSlug] || { inr: 1999, originalInr: 3999 };
    const text = `Hi RootAccess Admin,\n\nI want to enroll in "${courseTitle}".\n\nMy Details:\n- Name: ${userName || 'Student'}\n- Registered Email: ${userEmail}\n- Course: ${courseTitle}\n- Price: ₹${priceInfo.inr}\n\nPlease share your UPI ID / QR code so I can complete payment and get access to the course!`;
    return `https://wa.me/${ENROLLMENT_PAYMENT_CONFIG.whatsappNumberRaw}?text=${encodeURIComponent(text)}`;
  },

  isAdminEmail: (email?: string | null): boolean => {
    if (!email) return false;
    return email.trim().toLowerCase() === ENROLLMENT_PAYMENT_CONFIG.adminEmail.toLowerCase();
  },
};
