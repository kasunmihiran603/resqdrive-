import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { 
  ClipboardList, Clock, 
  MapPin, ShieldAlert, BadgeCheck, ToggleLeft, ToggleRight, 
  Palette, Sun, Moon, Info, Key, Smartphone
} from 'lucide-react';

const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const { theme, accentColor, setAccentColor, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Interactive mock states for settings
  const [telemetry, setTelemetry] = useState(true);
  const [sounds, setSounds] = useState(false);

  // -------------------------------------------------------------
  // Dynamic Views: Profile View
  // -------------------------------------------------------------
  const renderProfileView = () => {
    const v = currentUser?.vehicleInfo || {};
    const g = currentUser?.garageInfo || {};
    const t = currentUser?.towingInfo || {};

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your ResQDrive identity and verified credentials.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main User Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm theme-transition">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="h-16 w-16 rounded-2xl bg-accent-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-accent-500/20">
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser?.email}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-slate-400">Verified System Profile</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Role</label>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-1">{currentUser?.role}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Unique Account ID</label>
                <p className="text-slate-800 dark:text-slate-200 font-mono text-xs mt-1">RD-{currentUser?.uid?.substring(0, 8) || 'SYSTEM'}</p>
              </div>
              
              {/* Conditional Info based on role */}
              {currentUser?.role === 'USER' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Vehicle Brand & Model</label>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold mt-1">{v.vehicleBrand} {v.vehicleModel}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">License Plate Number</label>
                    <p className="text-slate-850 dark:text-slate-200 font-mono font-bold mt-1 uppercase tracking-wide">{v.vehicleNumber}</p>
                  </div>
                </>
              )}

              {currentUser?.role === 'GARAGE_OWNER' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Garage Name</label>
                    <p className="text-slate-850 dark:text-slate-200 font-semibold mt-1">{g.garageName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Garage Hotline</label>
                    <p className="text-slate-850 dark:text-slate-200 font-mono mt-1">{g.contactNumber}</p>
                  </div>
                </>
              )}

              {currentUser?.role === 'TOWING_OPERATOR' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Company Name</label>
                    <p className="text-slate-850 dark:text-slate-200 font-semibold mt-1">{t.companyName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Dispatcher Contact</label>
                    <p className="text-slate-850 dark:text-slate-200 font-mono mt-1">{t.contactNumber}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar Metadata Card */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 theme-transition space-y-4">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Security Credentials</h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <span className="text-slate-500">MFA Status</span>
                <span className="font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <span className="text-slate-500">Last Sign-in</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <span className="text-slate-500">Encryption Layer</span>
                <span className="font-semibold text-accent-600 dark:text-accent-400 flex items-center gap-1"><Key className="w-3.5 h-3.5" /> AES-256</span>
              </div>
            </div>
            <button 
              disabled 
              className="w-full mt-4 py-2.5 px-4 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-transparent rounded-xl text-xs font-semibold cursor-not-allowed text-center transition-colors"
            >
              Update Credentials (Locked)
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // -------------------------------------------------------------
  // Dynamic Views: Requests View (Placeholder list)
  // -------------------------------------------------------------
  const renderRequestsView = () => {
    // Role-based custom dummy requests
    const getDummyRequests = () => {
      switch (currentUser?.role) {
        case 'ADMIN':
          return [
            { id: 'REQ-9102', requester: 'Sarah Jenkins', type: 'Flat Tire Support', location: 'Highway A9, Mile 45', time: '10 mins ago', status: 'DISPATCHED', provider: 'Speedy Towing', priority: 'HIGH' },
            { id: 'REQ-9101', requester: 'David Miller', type: 'Engine Failure', location: '12th Cross Ave, Downtown', time: '28 mins ago', status: 'COMPLETED', provider: 'Vortex Garage', priority: 'MEDIUM' },
            { id: 'REQ-9100', requester: 'Emily Clark', type: 'Locked Out Assistance', location: 'Queens Blvd, Central', time: '1 hr ago', status: 'PENDING', provider: 'Pending Assignment', priority: 'LOW' }
          ];
        case 'GARAGE_OWNER':
          return [
            { id: 'REQ-8874', requester: 'Robert Chen', type: 'Starter Motor Failure', location: 'Sector 4, Parking Block', time: '15 mins ago', status: 'PENDING', provider: currentUser.garageInfo?.garageName, priority: 'MEDIUM' },
            { id: 'REQ-8869', requester: 'Maria Gomez', type: 'Engine Overheating Diagnostic', location: 'Expressway Exit 14', time: '3 hrs ago', status: 'COMPLETED', provider: currentUser.garageInfo?.garageName, priority: 'HIGH' }
          ];
        case 'TOWING_OPERATOR':
          return [
            { id: 'REQ-7741', requester: 'James Cooper', type: 'Heavy Duty Towing', location: 'Bay Bridge, Eastbound', time: '5 mins ago', status: 'DISPATCHED', provider: currentUser.towingInfo?.companyName, priority: 'HIGH' },
            { id: 'REQ-7739', requester: 'Diana Prince', type: 'Sedan Transfer', location: '88 West Mall Road', time: '2 hrs ago', status: 'COMPLETED', provider: currentUser.towingInfo?.companyName, priority: 'LOW' }
          ];
        case 'USER':
        default:
          return [
            { id: 'REQ-1204', requester: currentUser?.name || 'You', type: 'Flat Battery Lockout', location: 'Mock Location (Home)', time: 'Just now (Draft)', status: 'DRAFT', provider: 'Not Dispatched Yet', priority: 'HIGH' }
          ];
      }
    };

    const requests = getDummyRequests();

    const getStatusStyle = (status) => {
      switch (status) {
        case 'COMPLETED':
          return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
        case 'DISPATCHED':
          return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 animate-pulse';
        case 'PENDING':
          return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
        case 'DRAFT':
        default:
          return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Assistance Requests</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {currentUser?.role === 'USER' 
                ? 'Track your active rescue dispatches and request history.' 
                : 'Monitor active roadside assistance work and job requests.'}
            </p>
          </div>
          {currentUser?.role === 'USER' && (
            <button className="self-start py-2.5 px-5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-accent-500/15 cursor-pointer theme-transition">
              Request Towing (Locked)
            </button>
          )}
        </div>

        {/* Requests Table/Card container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm theme-transition">
          {requests.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <ClipboardList className="w-12 h-12 text-slate-350 dark:text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No requests found</h3>
              <p className="text-sm text-slate-450 dark:text-slate-500 mt-1">There are currently no dispatch requests recorded for this profile.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider theme-transition">
                    <th className="py-4 px-6">Request ID</th>
                    <th className="py-4 px-6">Requester</th>
                    <th className="py-4 px-6">Incident Details</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Assigned Operator</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm text-slate-700 dark:text-slate-300 theme-transition">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="py-4.5 px-6 font-mono font-semibold text-xs tracking-wider text-slate-900 dark:text-white">
                        {req.id}
                      </td>
                      <td className="py-4.5 px-6 font-semibold">
                        {req.requester}
                      </td>
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{req.type}</span>
                          <span className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {req.time}</span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6 text-slate-550 dark:text-slate-450">
                        <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {req.location}</span>
                      </td>
                      <td className="py-4.5 px-6 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {req.provider}
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // -------------------------------------------------------------
  // Dynamic Views: Settings View (Theme & Accent configuration)
  // -------------------------------------------------------------
  const renderSettingsView = () => {
    const accents = [
      { id: 'blue', label: 'Classic Blue', hex: '#2563eb', bg: 'bg-blue-600', ring: 'ring-blue-500' },
      { id: 'green', label: 'Emerald Green', hex: '#059669', bg: 'bg-emerald-600', ring: 'ring-emerald-500' },
      { id: 'indigo', label: 'Royal Indigo', hex: '#4f46e5', bg: 'bg-indigo-600', ring: 'ring-indigo-500' },
      { id: 'rose', label: 'Vibrant Rose', hex: '#e11d48', bg: 'bg-rose-600', ring: 'ring-rose-500' },
    ];

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings & Customization</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure layout options, system themes, and custom styling presets.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Customization Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Theme & Palette Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm theme-transition space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-accent-500" />
                  Appearance presets
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Customize the color highlights and interface modes.</p>
              </div>

              {/* Accent Color Grid Selection */}
              <div className="space-y-3.5">
                <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Accent Theme Color</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {accents.map((item) => {
                    const isSelected = accentColor === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setAccentColor(item.id)}
                        className={`flex flex-col items-center justify-between p-4 rounded-xl border cursor-pointer theme-transition ${
                          isSelected
                            ? 'border-accent-500 bg-accent-50/20 dark:bg-accent-950/10'
                            : 'border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/20'
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-full ${item.bg} flex items-center justify-center text-white font-bold text-xs ring-4 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 ${
                          isSelected ? item.ring : 'ring-transparent'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                        <span className="text-xs font-bold mt-3 text-slate-700 dark:text-slate-300">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Toggle option */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Light / Dark Interface Mode</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Toggle default screen mode between dark theme and clean light theme.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-450 dark:text-slate-500 capitalize flex items-center gap-1.5">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    {theme} Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-1 rounded-full text-slate-400 hover:text-accent-500 cursor-pointer theme-transition"
                  >
                    {theme === 'dark' ? (
                      <ToggleRight className="w-12 h-8 text-accent-500" />
                    ) : (
                      <ToggleLeft className="w-12 h-8 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mock System Toggles panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm theme-transition space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-accent-500" />
                  Preferences & Diagnostics
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Configure system telemetry, alert feedback levels, and diagnostic sound effects.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Share Telemetry & Diagnostics</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Transmits real-time diagnostic GPS telemetry to dispatch partners when calling support.</p>
                  </div>
                  <button onClick={() => setTelemetry(!telemetry)} className="cursor-pointer">
                    {telemetry ? <ToggleRight className="w-11 h-7 text-accent-500" /> : <ToggleLeft className="w-11 h-7 text-slate-350 dark:text-slate-700" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Siren & Alert Audio Alerts</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Trigger loud notification sounds for active emergency alerts and operator arrivals.</p>
                  </div>
                  <button onClick={() => setSounds(!sounds)} className="cursor-pointer">
                    {sounds ? <ToggleRight className="w-11 h-7 text-accent-500" /> : <ToggleLeft className="w-11 h-7 text-slate-350 dark:text-slate-700" />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Info card */}
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 theme-transition space-y-4">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-accent-500" />
                Custom Accent Architecture
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                By setting values like <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-950 font-mono text-[10px]">data-accent="rose"</code>, ResQDrive's layout system utilizes dynamic Tailwind CSS variables inside the global styling engine to transform colors instantly.
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 flex items-start gap-2.5">
                <ShieldAlert className="w-4.5 h-4.5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-slate-500 leading-normal">
                  All local layout modifications and customization presets are automatically persisted inside the client's <code className="font-mono text-[9px] bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">localStorage</code> wrapper.
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // -------------------------------------------------------------
  // View Dispatcher
  // -------------------------------------------------------------
  const renderActiveView = () => {
    switch (activeTab) {
      case 'requests':
        return renderRequestsView();
      case 'profile':
        return renderProfileView();
      case 'settings':
        return renderSettingsView();
      case 'dashboard':
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-100 font-sans flex flex-col antialiased theme-transition">
      
      {/* Top Navbar */}
      <Navbar />

      <div className="flex-1 flex w-full relative">
        {/* Left Sidebar (Desktop Only) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Workspace Layout */}
        <div className="flex-1 flex flex-col md:pl-64 min-w-0">
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 pb-24 md:pb-12">
            <AnimatePresence mode="wait">
              {renderActiveView()}
            </AnimatePresence>
          </main>

          {/* Persistent Small Footer inside workspace */}
          <footer className="border-t border-slate-200/50 dark:border-slate-900 bg-white/30 dark:bg-slate-950/20 px-6 py-4.5 text-center text-slate-400 dark:text-slate-500 text-xs theme-transition md:pl-0">
            <p>© 2026 ResQDrive Technologies Inc. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Bottom Nav Bar (Mobile Only) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
};

export default MainLayout;
