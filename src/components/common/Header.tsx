import React from 'react';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ subtitle }) => {
  return (
    <header className="flex flex-col items-center justify-center text-center mb-8">
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white shadow-sm mb-3">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="font-mono text-xs tracking-wider uppercase font-semibold text-slate-200">
          RootAccess
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        RootAccess
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          {subtitle}
        </p>
      )}
    </header>
  );
};
