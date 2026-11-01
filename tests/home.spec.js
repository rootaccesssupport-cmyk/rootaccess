import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { homeTestData } from '../test-data/testData.js';

test.describe('RootAccess Homepage', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load the homepage and display brand logo and hero headline', async ({ page }) => {
    // Assert page URL and Title
    await expect(page).toHaveURL(/\/?$/);
    await expect(page).toHaveTitle(homeTestData.pageTitle);

    // Verify brand logo and hero elements
    await expect(homePage.brandLogo).toBeVisible();
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.heroHeading).toContainText(homeTestData.heroHeading);
    await expect(homePage.heroSubtitle).toBeVisible();
    await expect(homePage.createAccountCta).toBeVisible();
  });

  test('should display primary navigation links and authentication buttons', async () => {
    await expect(homePage.navCareerTracks).toBeVisible();
    await expect(homePage.navPracticalLearning).toBeVisible();
    await expect(homePage.navHowItWorks).toBeVisible();
    await expect(homePage.navFaq).toBeVisible();
    await expect(homePage.navLogin).toBeVisible();
    await expect(homePage.navGetStarted).toBeVisible();
  });

  test('should render featured curriculum tracks with titles and competencies', async () => {
    await expect(homePage.tracksSection).toBeVisible();
    await expect(homePage.tracksHeading).toBeVisible();

    // Verify each expected track is displayed
    for (const track of homeTestData.featuredTracks) {
      const trackCard = homePage.getTrackCard(track.title);
      await expect(trackCard).toBeVisible();
    }
  });

  test('should navigate to course details when clicking Explore Curriculum', async ({ page }) => {
    const playwrightTrack = homeTestData.featuredTracks.find(
      (t) => t.title === 'Automation Testing Foundations'
    );

    const exploreButton = homePage.getTrackExploreButton(playwrightTrack.title);
    await expect(exploreButton).toBeVisible();
    await exploreButton.click();

    // Verify navigation to the course curriculum detail page
    await expect(page).toHaveURL(new RegExp(playwrightTrack.expectedUrlSnippet));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should toggle FAQ accordion items to reveal answers', async ({ page }) => {
    const { question, answerSnippet } = homeTestData.secondFaq;

    const questionButton = homePage.getFaqQuestionButton(question);
    await expect(questionButton).toBeVisible();

    // Answer should not be visible before clicking
    await expect(page.getByText(answerSnippet)).not.toBeVisible();

    // Click to open FAQ accordion item
    await homePage.toggleFaq(question);

    // Answer should now be visible
    await expect(page.getByText(answerSnippet)).toBeVisible();
  });

  test('should navigate to login page when clicking Log in link', async ({ page }) => {
    await homePage.navLogin.click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should render footer with branding and contact details', async () => {
    await expect(homePage.footer).toBeVisible();
    await expect(homePage.footerCopyright).toBeVisible();
    await expect(homePage.footerSupportEmail).toBeVisible();
  });
});
