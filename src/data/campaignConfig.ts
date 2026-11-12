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

export const DEFAULT_FOUNDING_500_CONFIG: LaunchCampaignConfig = {
  id: 'playwright-founding-500',
  campaignName: 'FOUNDING 500 STUDENTS',
  courseSlug: 'playwright-automation',
  courseTitle: 'Playwright Automation with JavaScript + AI',
  launchPriceInr: 149,
  regularPriceInr: 649,
  originalPriceInr: 1599,
  maxSeats: 500,
  durationDays: 30,
  isActive: true,
  description: 'Special introductory offer for the first 500 verified paying students. Includes complete 20-day curriculum with 30 days of full interactive access.',
  badgeText: 'FOUNDING 500 STUDENTS • 30 DAYS ACCESS',
};

// Backwards compatibility alias
export const DEFAULT_FOUNDING_100_CONFIG = DEFAULT_FOUNDING_500_CONFIG;

const LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY = 'rootaccess_campaign_config_playwright';

/**
 * Get the current campaign config from localStorage, falling back to defaults.
 * Automatically migrates 100-seat configuration to 500-seat campaign.
 */
export function getStoredCampaignConfig(): LaunchCampaignConfig {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate legacy 100-seat config to 500-seat config
      const isLegacy100 =
        parsed.maxSeats === 100 ||
        parsed.id === 'playwright-founding-100' ||
        (typeof parsed.campaignName === 'string' && parsed.campaignName.includes('100')) ||
        (typeof parsed.description === 'string' && parsed.description.includes('100')) ||
        (typeof parsed.badgeText === 'string' && parsed.badgeText.includes('100'));

      if (isLegacy100) {
        const migrated: LaunchCampaignConfig = {
          ...DEFAULT_FOUNDING_500_CONFIG,
          ...parsed,
          id: 'playwright-founding-500',
          campaignName: 'FOUNDING 500 STUDENTS',
          badgeText: 'FOUNDING 500 STUDENTS • 30 DAYS ACCESS',
          maxSeats: parsed.maxSeats === 100 ? 500 : (parsed.maxSeats ?? 500),
          description: DEFAULT_FOUNDING_500_CONFIG.description,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_CAMPAIGN_CONFIG_KEY, JSON.stringify(migrated));
        } catch {
          // ignore
        }
        return migrated;
      }
      return { ...DEFAULT_FOUNDING_500_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to parse stored campaign config:', err);
  }
  return { ...DEFAULT_FOUNDING_500_CONFIG };
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
