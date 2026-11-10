export interface LaunchCampaignConfig {
  id: string;
  campaignName: string;
  courseSlug: string;
  courseTitle: string;
  launchPriceInr: number;
  regularPriceInr: number;
  originalPriceInr: number;
  maxSeats: number;
  durationDays: number;
  isActive: boolean;
  description: string;
  badgeText: string;
}

export const DEFAULT_FOUNDING_100_CONFIG: LaunchCampaignConfig = {
  id: 'playwright-founding-100',
  campaignName: 'FOUNDING 100 STUDENTS',
  courseSlug: 'playwright-automation',
  courseTitle: 'Playwright Automation with JavaScript + AI',
  launchPriceInr: 149,
  regularPriceInr: 649,
  originalPriceInr: 1599,
  maxSeats: 100,
  durationDays: 30,
  isActive: true,
  description: 'Special introductory offer for the first 100 verified paying students. Includes complete 20-day curriculum with 30 days of full interactive access.',
  badgeText: 'FOUNDING 100 STUDENTS • 30 DAYS ACCESS',
};

const LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY = 'rootaccess_campaign_config_playwright';

/**
 * Get the current campaign config from localStorage, falling back to defaults.
 */
export function getStoredCampaignConfig(): LaunchCampaignConfig {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_FOUNDING_100_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to parse stored campaign config:', err);
  }
  return { ...DEFAULT_FOUNDING_100_CONFIG };
}

/**
 * Save updated campaign config locally.
 */
export function saveStoredCampaignConfig(config: Partial<LaunchCampaignConfig>): LaunchCampaignConfig {
  const current = getStoredCampaignConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save campaign config:', err);
  }
  return updated;
}
