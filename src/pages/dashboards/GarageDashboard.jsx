import React from 'react';
import { useAuth } from '../../context/AuthContext';

const GarageDashboard = () => {
  const { currentUser, logout } = useAuth();
  const garage = currentUser?.garageInfo || {};
  const services = garage.servicesOffered || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white tracking-wider text-sm">
              RD
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ResQDrive
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              Garage Partner
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
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Welcome back, {currentUser?.name || 'Garage Partner'}!
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Manage your service garage and keep track of local roadside assistance requests.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Owner Profile */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                Owner Profile
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <p className="text-slate-200 font-medium mt-0.5">{currentUser?.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-200 font-medium mt-0.5">{currentUser?.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Hours</label>
                    <p className="text-slate-300 text-xs mt-0.5">{garage.operatingHours || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Experience</label>
                    <p className="text-slate-300 text-xs mt-0.5">{garage.experienceLevel || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Garage Business details */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Garage Information
              </h2>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Garage Name</label>
                  <p className="text-slate-200 font-semibold text-base mt-0.5">{garage.garageName}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Number</label>
                  <p className="text-slate-200 font-medium mt-0.5">{garage.contactNumber}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</label>
                  <p className="text-slate-300 text-xs leading-relaxed mt-0.5">{garage.garageAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Services Offered & Requests */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Services Offered
              </h2>
              {services.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {services.map((svc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs mb-6">No services registered.</p>
              )}
            </div>
            <div>
              <button 
                disabled 
                className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed text-center"
              >
                Accept Jobs Queue (Locked)
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

export default GarageDashboard;
