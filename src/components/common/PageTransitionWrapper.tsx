import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

/**
 * PageTransitionWrapper
 * 
 * Re-triggers the smooth page transition animation whenever the pathname changes,
 * without re-mounting or interfering with context providers.
 */
export const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition min-h-screen flex flex-col">
      {children}
    </div>
  );
};
