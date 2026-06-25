import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Truck, ShieldAlert, BadgeInfo } from 'lucide-react';

const TowingDashboard = () => {
  const { currentUser } = useAuth();
  const towing = currentUser?.towingInfo || {};
  const vehicleTypes = towing.supportedVehicles || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Welcome back, {currentUser?.name || 'Operator'}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-1">
          Manage your flatbeds, respond to rescue dispatches, and coordinate active heavy towing services.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Operator Identity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <User className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Operator Profile
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Owner Name</label>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{currentUser?.name}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</label>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{currentUser?.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>MDT Status: Connected</span>
            <span className="h-2 w-2 rounded-full bg-accent-500"></span>
          </div>
        </div>

        {/* Card 2: Company Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Towing Business
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Company Name</label>
                <p className="text-slate-850 dark:text-slate-200 font-semibold text-base mt-0.5">{towing.companyName}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Dispatch Contact</label>
                <p className="text-slate-850 dark:text-slate-200 font-mono mt-0.5">{towing.contactNumber}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Operating Areas</label>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-normal mt-0.5">{towing.operatingAreas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Supported Vehicles & Action */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden theme-transition group">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <BadgeInfo className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Supported Vehicles
            </h2>
            {vehicleTypes.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {vehicleTypes.map((type, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20"
                  >
                    {type}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-450 dark:text-slate-500 text-xs mb-6">No vehicle types registered.</p>
            )}
            <div className="inline-flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
              <ShieldAlert className="w-4.5 h-4.5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
              <span className="text-[10px] text-slate-450 dark:text-slate-550 leading-relaxed">
                Active dispatches, route telemetry, and map overlays will go live in Phase 3.
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button 
              disabled 
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Towing Dispatch Maps (Locked)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowingDashboard;
