import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white tracking-wider text-sm">
              RD
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ResQDrive
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-400/10 text-red-400 border border-red-400/20">
              Administrator
            </span>
            <button
              onClick={logout}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Admin Workspace
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Welcome, {currentUser?.name || 'Administrator'}. This is the central operational control panel for the platform.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Admin Info */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Identity Verification
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Role</label>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 mt-1 uppercase tracking-wider">
                    {currentUser?.role}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Email</label>
                  <p className="text-slate-200 font-mono text-sm mt-1">{currentUser?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Platform Analytics (Future Phase Placeholder) */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl opacity-75 relative overflow-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                Global Metrics
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                The global analytics engine, active ticket status, and service partner charts will be loaded in a future update.
              </p>
            </div>
            <div>
              <button 
                disabled 
                className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed text-center"
              >
                Access Analytics (Locked)
              </button>
            </div>
          </div>

          {/* Card 3: Administrative Control (Future Phase Placeholder) */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl opacity-75 relative overflow-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4 2 2 0 000 4zm0 0v2m0-6V4m6 6v10m6-2a2 2 0 100-4 2 2 0 000 4zm0 0v2m0-6V4" />
                </svg>
                System Settings
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Configuration controls for adjusting response areas, platform parameters, fee structures, and partner verifications.
              </p>
            </div>
            <div>
              <button 
                disabled 
                className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed text-center"
              >
                System Settings (Locked)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-slate-500 text-xs mt-12">
        <p>© 2026 ResQDrive Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
