import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ClipboardList, User, Settings } from 'lucide-react';
const Sidebar = ({ activeTab, setActiveTab }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed bottom-0 top-[69px] left-0 z-30 hidden w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 backdrop-blur-md md:flex flex-col theme-transition">
      <div className="flex-1 py-6 px-4 space-y-7 flex flex-col justify-between">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide relative group cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-600 dark:text-accent-400 bg-accent-50/50 dark:bg-accent-950/20'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Active Left Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-accent-600 dark:bg-accent-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                <IconComponent className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-accent-600 dark:text-accent-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Small operational card at bottom of sidebar */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 theme-transition">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">SYSTEM STATUS</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">All Operations Online</span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">ResQDrive Gateway: v1.2</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
