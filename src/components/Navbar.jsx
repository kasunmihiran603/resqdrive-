import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return {
          label: 'Administrator',
          classes: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20',
        };
      case 'GARAGE_OWNER':
        return {
          label: 'Garage Partner',
          classes: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20',
        };
      case 'TOWING_OPERATOR':
        return {
          label: 'Towing Operator',
          classes: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20 dark:bg-cyan-400/10 dark:text-cyan-400 dark:border-cyan-400/20',
        };
      case 'USER':
      default:
        return {
          label: 'Driver',
          classes: 'bg-accent-500/10 text-accent-600 border-accent-500/20 dark:bg-accent-400/10 dark:text-accent-400 dark:border-accent-400/20',
        };
    }
  };

  const badge = getRoleBadge(currentUser?.role);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md px-6 py-3.5 theme-transition">
      <div className="flex items-center justify-between">
        {/* Brand/Mobile Title */}
        <div className="flex items-center gap-3">
          {/* Logo element */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-bold tracking-wider text-sm shadow-md shadow-accent-500/20">
            RD
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent sm:block">
            ResQDrive
          </span>
        </div>

        {/* User profile & Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

          {/* User Info & Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-none">
                {currentUser?.name || 'Driver'}
              </span>
              <span className="text-[10px] font-medium text-slate-400 mt-1">
                {currentUser?.email}
              </span>
            </div>
            
            {/* Role Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.classes}`}>
              {badge.label}
            </span>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="group p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer theme-transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
