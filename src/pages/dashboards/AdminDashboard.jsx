import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, BarChart3, Settings, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Admin Workspace
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-1">
          Welcome, {currentUser?.name || 'Administrator'}. This is the central operational control panel for the platform.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Admin Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Identity Verification
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Role</label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20 uppercase tracking-wider">
                    {currentUser?.role}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Primary Email</label>
                <p className="text-slate-850 dark:text-slate-200 font-mono text-sm mt-1">{currentUser?.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Access: Superuser</span>
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
          </div>
        </div>

        {/* Card 2: Platform Analytics (Future Phase Placeholder) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden theme-transition group">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Global Metrics
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              The global analytics engine, active ticket status, and service partner charts will be loaded in a future update.
            </p>
            <div className="inline-flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
              <ShieldAlert className="w-4.5 h-4.5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
              <span className="text-[10px] text-slate-450 dark:text-slate-550 leading-relaxed">
                Metric aggregation, partner graphs, and SLA reports will unlock in Phase 3.
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button 
              disabled 
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Access Analytics (Locked)
            </button>
          </div>
        </div>

        {/* Card 3: Administrative Control (Future Phase Placeholder) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden theme-transition group">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <Settings className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              System Settings
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Configuration controls for adjusting response areas, platform parameters, fee structures, and partner verifications.
            </p>
          </div>
          <div className="mt-6">
            <button 
              disabled 
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              System Settings (Locked)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
