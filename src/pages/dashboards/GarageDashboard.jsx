import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShieldAlert, Wrench, Settings } from 'lucide-react';

const GarageDashboard = () => {
  const { currentUser } = useAuth();
  const garage = currentUser?.garageInfo || {};
  const services = garage.servicesOffered || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Welcome back, {currentUser?.name || 'Garage Partner'}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-1">
          Manage your service garage and keep track of local roadside assistance requests.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Owner Profile */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <User className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Owner Profile
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Full Name</label>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{currentUser?.name}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</label>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{currentUser?.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Hours</label>
                  <p className="text-slate-650 dark:text-slate-350 text-xs mt-0.5">{garage.operatingHours || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Experience</label>
                  <p className="text-slate-650 dark:text-slate-350 text-xs mt-0.5">{garage.experienceLevel || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Terminal: Operational</span>
            <span className="h-2 w-2 rounded-full bg-accent-500"></span>
          </div>
        </div>

        {/* Card 2: Garage Business details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Garage Information
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Garage Name</label>
                <p className="text-slate-850 dark:text-slate-200 font-semibold text-base mt-0.5">{garage.garageName}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contact Number</label>
                <p className="text-slate-850 dark:text-slate-200 font-mono mt-0.5">{garage.contactNumber}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Address</label>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-0.5">{garage.garageAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Services Offered & Requests */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden theme-transition group">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <Settings className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Services Offered
            </h2>
            {services.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {services.map((svc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-450 dark:text-slate-500 text-xs mb-6">No services registered.</p>
            )}
            <div className="inline-flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
              <ShieldAlert className="w-4.5 h-4.5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
              <span className="text-[10px] text-slate-450 dark:text-slate-550 leading-relaxed">
                Dispatch queues and service request notifications will activate in Phase 3.
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button 
              disabled 
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Accept Jobs Queue (Locked)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageDashboard;
