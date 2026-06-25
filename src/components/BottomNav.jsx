import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ClipboardList, User, Settings } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-35 md:hidden border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md pb-safe theme-transition">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              {/* Highlight Background bubble */}
              {isActive && (
                <motion.div
                  layoutId="activeBottomNavBubble"
                  className="absolute inset-x-2 inset-y-1.5 rounded-2xl bg-accent-50/70 dark:bg-accent-950/20 -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              <IconComponent
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive
                    ? 'text-accent-600 dark:text-accent-400 scale-110'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              />
              <span
                className={`text-[10px] font-bold tracking-wide mt-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-600 dark:text-accent-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
