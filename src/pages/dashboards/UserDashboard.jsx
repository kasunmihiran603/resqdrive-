import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white tracking-wider text-sm">
              RD
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ResQDrive
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-400/10 text-indigo-400 border border-indigo-400/20">
              User
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
            Welcome back, {currentUser?.name || 'Driver'}!
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Your personal emergency road assistance command center.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: User Profile & Vehicle Metadata */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Driver Profile
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <p className="text-slate-200 font-medium">{currentUser?.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-200 font-medium">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-900">
              <span className="text-xs text-slate-500">Session ID: {Math.floor(Math.random() * 900000) + 100000}</span>
            </div>
          </div>

          {/* Card 2: Vehicle Details */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Registered Vehicle
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle Type</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 mt-1 border border-slate-700">
                    {currentUser?.vehicleType || 'Not specified'}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle Plate Number</label>
                  <p className="text-slate-200 font-mono text-base font-semibold tracking-wider uppercase mt-1">
                    {currentUser?.vehicleNumber || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Assistance Flow (Future Phase Placeholder) */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl opacity-75 relative overflow-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Emergency Center
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Emergency Request systems are currently being optimized and will be activated in the next development phase.
              </p>
            </div>
            <div>
              <button 
                disabled 
                className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed text-center"
              >
                Request Assistance (Locked)
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

export default UserDashboard;
