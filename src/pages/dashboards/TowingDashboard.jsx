import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TowingDashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white tracking-wider text-sm">
              RD
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ResQDrive
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
              Towing Operator
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
            Welcome back, {currentUser?.name || 'Operator'}!
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Manage your flatbeds, respond to rescue dispatches, and coordinate active heavy towing services.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Operator Identity */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                Operator Profile
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Operator Name</label>
                  <p className="text-slate-200 font-medium">{currentUser?.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-200 font-medium">{currentUser?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Company Details */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h2m-2 0H5m13 0h2a2 2 0 002-2v-3a2 2 0 00-2-2h-3v7m-3-7h3m-3 4h3" />
                </svg>
                Towing Business
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name</label>
                  <p className="text-slate-200 font-semibold text-base mt-0.5">{currentUser?.companyName || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Dispatch Contact</label>
                  <p className="text-slate-200 font-medium">{currentUser?.contactNumber || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Tow Jobs (Future Phase Placeholder) */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl opacity-75 relative overflow-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Towing Job Board
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Towing request and location tracking systems are locked during Phase 1. They will be integrated in future phases.
              </p>
            </div>
            <div>
              <button 
                disabled 
                className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed text-center"
              >
                View Map (Locked)
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

export default TowingDashboard;
