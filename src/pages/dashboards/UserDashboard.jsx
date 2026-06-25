import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Car, ShieldAlert, Award } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const vehicle = currentUser?.vehicleInfo || {};

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Welcome back, {currentUser?.name || 'Driver'}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-1">
          Your personal emergency road assistance command center.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: User Profile & Identity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <User className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Driver Profile
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
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Emergency Contact</label>
                <p className="text-slate-850 dark:text-slate-200 font-semibold mt-0.5">{vehicle.emergencyContact || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Session: Secure</span>
            <span className="h-2 w-2 rounded-full bg-accent-500"></span>
          </div>
        </div>

        {/* Card 2: Vehicle Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between theme-transition">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <Car className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Vehicle Information
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Vehicle Model</label>
                <p className="text-slate-850 dark:text-slate-200 font-bold text-base mt-0.5">
                  {vehicle.vehicleBrand} {vehicle.vehicleModel}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Type</label>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mt-1 border border-slate-200 dark:border-slate-700/50">
                    {vehicle.vehicleType}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Plate Number</label>
                  <p className="text-slate-850 dark:text-slate-200 font-mono text-sm font-bold tracking-wide uppercase mt-1">
                    {vehicle.vehicleNumber}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/50">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Insurance Details</label>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  <strong>Provider:</strong> {vehicle.insuranceProvider || 'None'}<br />
                  <strong>Policy #:</strong> {vehicle.insuranceNumber || 'None'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Assistance Flow (Future Phase Placeholder) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden theme-transition group">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              Emergency Assistance
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Emergency Request dispatching, real-time GPS coordinates matching, and roadside diagnostics will be fully integrated in the upcoming phases.
            </p>
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
              <Award className="w-4.5 h-4.5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
              <span className="text-[10px] text-slate-450 dark:text-slate-550 leading-relaxed">
                Phase 2 focuses on layouts and accent toggles. Phase 3 will unlock actions.
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button 
              disabled 
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Request Assistance (Locked)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
