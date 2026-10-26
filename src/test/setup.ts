import '@testing-library/jest-dom';
import { vi } from 'vitest';

// In automated unit tests, isolate components from live external Supabase network calls
vi.mock('../lib/supabase', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/supabase')>();
  return {
    ...actual,
    isSupabaseConfigured: false,
  };
});

// Polyfill window.matchMedia if needed in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
