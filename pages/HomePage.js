/**
 * Page Object Model for the RootAccess Homepage
 * Represents user interactions and accessible locators for the landing page.
 */
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation Bar Elements
    this.brandLogo = page.getByRole('link', { name: 'RootAccess' }).first();
    this.navCareerTracks = page.getByRole('link', { name: 'Career Tracks' });
    this.navPracticalLearning = page.getByRole('link', { name: 'Practical Learning' });
    this.navHowItWorks = page.getByRole('link', { name: 'How It Works' });
    this.navFaq = page.getByRole('link', { name: 'FAQ' });
    this.navLogin = page.getByRole('link', { name: 'Log in' });
    this.navGetStarted = page.getByRole('link', { name: 'Get Started' });

    // Hero Section
    this.heroSection = page.locator('section').first();
    this.heroHeading = page.getByRole('heading', { level: 1 });
    this.heroSubtitle = page.getByText(/RootAccess is built for everyone in tech/i);
    this.createAccountCta = page.getByRole('link', { name: /create free account/i }).first();
    this.devopsAcademyCta = page.getByRole('link', { name: /devops academy/i });
    this.playwrightJsCta = page.getByRole('link', { name: /playwright js/i });
    this.exploreAllTracksCta = page.getByRole('link', { name: /explore all tracks/i });

    // Trust Points
    this.trustPointsSection = page.getByText('100% Practical');

    // Tracks Section
    this.tracksSection = page.locator('#tracks');
    this.tracksHeading = page.getByRole('heading', { name: /software qa & testing engineer track/i });

    // FAQ Section
    this.faqSection = page.locator('#faq');
    this.faqHeading = page.getByRole('heading', { name: /frequently asked questions/i });

    // Footer
    this.footer = page.getByRole('contentinfo');
    this.footerCopyright = page.locator('footer').getByText(/Built for practical career advancement/i);
    this.footerSupportEmail = page.locator('footer').getByText('support@rootaccess.org');
  }

  /**
   * Navigate to the homepage
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Locate a specific track card by its heading title
   * @param {string} trackTitle
   */
  getTrackCard(trackTitle) {
    return this.tracksSection
      .locator('.grid > div')
      .filter({ has: this.page.getByRole('heading', { name: trackTitle }) });
  }

  /**
   * Locate the "Explore Curriculum" action link for a specific course track
   * @param {string} trackTitle
   */
  getTrackExploreButton(trackTitle) {
    return this.getTrackCard(trackTitle).getByRole('link', { name: /explore curriculum/i });
  }

  /**
   * Locate an FAQ button by question text
   * @param {string | RegExp} question
   */
  getFaqQuestionButton(question) {
    return this.faqSection.getByRole('button', { name: question });
  }

  /**
   * Click an FAQ item to toggle its expanded state
   * @param {string | RegExp} question
   */
  async toggleFaq(question) {
    const questionButton = this.getFaqQuestionButton(question);
    await questionButton.click();
  }
}
