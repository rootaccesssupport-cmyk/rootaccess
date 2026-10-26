import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls window to top (0, 0) whenever the route pathname or search changes.
 * Handles hash anchors (e.g., #section) gracefully if present.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there is an anchor hash, attempt to scroll to that element
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Otherwise, scroll the viewport immediately to the top
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch {
        // Fallback for older browsers or jsdom
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, search, hash]);

  return null;
};
