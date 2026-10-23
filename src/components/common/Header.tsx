import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ subtitle }) => {
  return (
    <header className="flex flex-col items-center justify-center text-center mb-8">
      <Link to="/" className="inline-block mb-3 group">
        <img
          src="/logo.png"
          alt="RootAccess"
          className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
        />
      </Link>
      <h1 className="sr-only">RootAccess</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          {subtitle}
        </p>
      )}
    </header>
  );
};
