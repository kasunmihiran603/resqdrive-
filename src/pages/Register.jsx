import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Wizard Step State: 1 = Role, 2 = Credentials, 3 = Domain Details
  const [step, setStep] = useState(1);

  // Form State: Credentials
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(''); // 'USER', 'GARAGE_OWNER', 'TOWING_OPERATOR'

  // Form State: User specific vehicle details
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Form State: Garage Owner specific details
  const [garageName, setGarageName] = useState('');
  const [garageContact, setGarageContact] = useState('');
  const [garageAddress, setGarageAddress] = useState('');
  const [garageHours, setGarageHours] = useState('');
  const [garageExperience, setGarageExperience] = useState('');
  const [servicesOffered, setServicesOffered] = useState([]);

  // Form State: Towing Operator specific details
  const [towingCompany, setTowingCompany] = useState('');
  const [towingContact, setTowingContact] = useState('');
  const [operatingAreas, setOperatingAreas] = useState('');
  const [supportedVehicles, setSupportedVehicles] = useState([]);

  // Validation & Error States
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-defined static lists for multi-select checklists
  const AVAILABLE_GARAGE_SERVICES = [
    'Engine repair',
    'Tires',
    'Battery replacement',
    'Towing',
    'Electrical',
    'Brake service',
    'AC repair',
    'Oil Change'
  ];

  const VEHICLE_TYPES = ['Car', 'Bike', 'Van', 'Truck'];

  // Handle Multi-Select Toggles
  const handleServiceToggle = (service) => {
    if (servicesOffered.includes(service)) {
      setServicesOffered(servicesOffered.filter(s => s !== service));
    } else {
      setServicesOffered([...servicesOffered, service]);
    }
  };

  const handleSupportedVehicleToggle = (type) => {
    if (supportedVehicles.includes(type)) {
      setSupportedVehicles(supportedVehicles.filter(t => t !== type));
    } else {
      setSupportedVehicles([...supportedVehicles, type]);
    }
  };

  // Step 2 Validations: Credentials
  const validateStep2 = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = 'Full Name is required.';
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validations: Domain metadata
  const validateStep3 = () => {
    const newErrors = {};

    if (role === 'USER') {
      if (!vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle plate number is required.';
      if (!vehicleType) newErrors.vehicleType = 'Vehicle type selection is required.';
      if (!vehicleBrand.trim()) newErrors.vehicleBrand = 'Vehicle brand is required.';
      if (!vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required.';
    } else if (role === 'GARAGE_OWNER') {
      if (!garageName.trim()) newErrors.garageName = 'Garage business name is required.';
      if (!garageContact.trim()) newErrors.garageContact = 'Primary contact number is required.';
      if (!garageAddress.trim()) newErrors.garageAddress = 'Garage address is required.';
    } else if (role === 'TOWING_OPERATOR') {
      if (!towingCompany.trim()) newErrors.towingCompany = 'Company name is required.';
      if (!towingContact.trim()) newErrors.towingContact = 'Primary contact number is required.';
      if (!operatingAreas.trim()) newErrors.operatingAreas = 'Operating regions are required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move Forward
  const handleNextStep = () => {
    setApiError('');
    if (step === 1) {
      if (!role) {
        setErrors({ role: 'Role selection is mandatory.' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  // Move Backward
  const handlePrevStep = () => {
    setApiError('');
    setErrors({});
    setStep(step - 1);
  };

  // Submit Registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateStep3()) return;

    setLoading(true);

    const baseData = {
      name,
      email,
      password,
      role
    };

    let domainData = {};
    if (role === 'USER') {
      domainData = {
        vehicleInfo: {
          vehicleNumber,
          vehicleType,
          vehicleBrand,
          vehicleModel,
          insuranceProvider: insuranceProvider || undefined,
          insuranceNumber: insuranceNumber || undefined,
          emergencyContact: emergencyContact || undefined
        }
      };
    } else if (role === 'GARAGE_OWNER') {
      domainData = {
        garageInfo: {
          garageName,
          contactNumber: garageContact,
          garageAddress,
          servicesOffered,
          operatingHours: garageHours || undefined,
          experienceLevel: garageExperience || undefined
        }
      };
    } else if (role === 'TOWING_OPERATOR') {
      domainData = {
        towingInfo: {
          companyName: towingCompany,
          contactNumber: towingContact,
          operatingAreas,
          supportedVehicles
        }
      };
    }

    const finalRegistrationPayload = { ...baseData, ...domainData };

    setTimeout(() => {
      const result = register(finalRegistrationPayload);
      setLoading(false);

      if (result.success) {
        switch (role) {
          case 'GARAGE_OWNER':
            navigate('/garage');
            break;
          case 'TOWING_OPERATOR':
            navigate('/towing');
            break;
          case 'USER':
          default:
            navigate('/user');
            break;
        }
      } else {
        setApiError(result.error);
      }
    }, 850);
  };

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.25 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 font-sans antialiased">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex w-12 h-12 rounded-xl bg-indigo-600 items-center justify-center font-bold text-white tracking-widest text-lg shadow-lg shadow-indigo-500/25 mb-4">
          RD
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Join ResQDrive
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete the professional onboarding steps below
        </p>
      </div>

      {/* Card container */}
      <div className="w-full max-w-xl bg-slate-900/60 border border-slate-900 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-slate-800">
        
        {/* Progress Tracker Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
            }`}>1</span>
            <span className={`text-[11px] font-semibold tracking-wider uppercase ${
              step === 1 ? 'text-indigo-400' : 'text-slate-500'
            }`}>Role</span>
          </div>
          <div className="h-[1px] flex-1 bg-slate-900 mx-3"></div>
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
            }`}>2</span>
            <span className={`text-[11px] font-semibold tracking-wider uppercase ${
              step === 2 ? 'text-indigo-400' : 'text-slate-500'
            }`}>Account</span>
          </div>
          <div className="h-[1px] flex-1 bg-slate-900 mx-3"></div>
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
            }`}>3</span>
            <span className={`text-[11px] font-semibold tracking-wider uppercase ${
              step === 3 ? 'text-indigo-400' : 'text-slate-500'
            }`}>Details</span>
          </div>
        </div>

        {/* Display System Errors */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h2 className="text-base font-semibold text-white">Select your primary role</h2>
                <p className="text-xs text-slate-400 mt-1">Select one of the accounts below to continue registration</p>
              </div>

              {errors.role && <p className="text-xs text-red-400">{errors.role}</p>}

              <div className="grid grid-cols-1 gap-4">
                {/* User Card */}
                <button
                  type="button"
                  onClick={() => { setRole('USER'); setErrors({}); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    role === 'USER'
                      ? 'bg-indigo-600/10 border-indigo-500 ring-2 ring-indigo-500/10'
                      : 'bg-slate-950/50 border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <span className="text-2xl">🚗</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Driver / Vehicle Owner</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Need quick emergency road support and garage matching</p>
                  </div>
                </button>

                {/* Garage Card */}
                <button
                  type="button"
                  onClick={() => { setRole('GARAGE_OWNER'); setErrors({}); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    role === 'GARAGE_OWNER'
                      ? 'bg-indigo-600/10 border-indigo-500 ring-2 ring-indigo-500/10'
                      : 'bg-slate-950/50 border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <span className="text-2xl">🏪</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Garage Business Owner</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Provide mechanical diagnostics and localized vehicle repairs</p>
                  </div>
                </button>

                {/* Towing Card */}
                <button
                  type="button"
                  onClick={() => { setRole('TOWING_OPERATOR'); setErrors({}); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    role === 'TOWING_OPERATOR'
                      ? 'bg-indigo-600/10 border-indigo-500 ring-2 ring-indigo-500/10'
                      : 'bg-slate-950/50 border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Towing Fleet Operator</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Provide flatbeds and emergency recovery/dispatch logistics</p>
                  </div>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!role}
                  className={`py-2.5 px-6 rounded-xl text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer ${
                    role 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-[0.98]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CREDENTIALS */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <div>
                <h2 className="text-base font-semibold text-white">Create login credentials</h2>
                <p className="text-xs text-slate-400 mt-1">Enter your account profile details</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full bg-slate-950 border ${
                    errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full bg-slate-950 border ${
                    errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full bg-slate-950 border ${
                      errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                    } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`w-full bg-slate-950 border ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                    } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-2.5 px-5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ROLE DETAILS */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h2 className="text-base font-semibold text-white">Additional Professional Details</h2>
                <p className="text-xs text-slate-400 mt-1">Provide information specific to your role context</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. USER (Vehicle Owner) Onboarding Fields */}
                {role === 'USER' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Vehicle Plate Number *
                        </label>
                        <input
                          type="text"
                          value={vehicleNumber}
                          onChange={(e) => {
                            setVehicleNumber(e.target.value);
                            if (errors.vehicleNumber) setErrors({ ...errors, vehicleNumber: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.vehicleNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="WP-ABC-1234"
                        />
                        {errors.vehicleNumber && <p className="mt-1 text-xs text-red-400">{errors.vehicleNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Vehicle Type *
                        </label>
                        <select
                          value={vehicleType}
                          onChange={(e) => {
                            setVehicleType(e.target.value);
                            if (errors.vehicleType) setErrors({ ...errors, vehicleType: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.vehicleType ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-4 transition-all duration-200 cursor-pointer`}
                        >
                          <option value="" disabled className="text-slate-700">Select vehicle type</option>
                          {VEHICLE_TYPES.map((t, idx) => (
                            <option key={idx} value={t} className="text-slate-300">{t}</option>
                          ))}
                        </select>
                        {errors.vehicleType && <p className="mt-1 text-xs text-red-400">{errors.vehicleType}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Vehicle Brand *
                        </label>
                        <input
                          type="text"
                          value={vehicleBrand}
                          onChange={(e) => {
                            setVehicleBrand(e.target.value);
                            if (errors.vehicleBrand) setErrors({ ...errors, vehicleBrand: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.vehicleBrand ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="Toyota, Honda, etc."
                        />
                        {errors.vehicleBrand && <p className="mt-1 text-xs text-red-400">{errors.vehicleBrand}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Vehicle Model *
                        </label>
                        <input
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => {
                            setVehicleModel(e.target.value);
                            if (errors.vehicleModel) setErrors({ ...errors, vehicleModel: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.vehicleModel ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="Prius, Civic, etc."
                        />
                        {errors.vehicleModel && <p className="mt-1 text-xs text-red-400">{errors.vehicleModel}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Insurance Provider (Optional)
                        </label>
                        <input
                          type="text"
                          value={insuranceProvider}
                          onChange={(e) => setInsuranceProvider(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200"
                          placeholder="Allianz, Sri Lanka Insurance, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Insurance Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={insuranceNumber}
                          onChange={(e) => setInsuranceNumber(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200"
                          placeholder="POL-12345678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Emergency Contact Number (Recommended)
                      </label>
                      <input
                        type="tel"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200"
                        placeholder="077XXXXXXX"
                      />
                    </div>
                  </div>
                )}

                {/* 2. GARAGE_OWNER Onboarding Fields */}
                {role === 'GARAGE_OWNER' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Garage Name *
                        </label>
                        <input
                          type="text"
                          value={garageName}
                          onChange={(e) => {
                            setGarageName(e.target.value);
                            if (errors.garageName) setErrors({ ...errors, garageName: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.garageName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="Express Auto Tech"
                        />
                        {errors.garageName && <p className="mt-1 text-xs text-red-400">{errors.garageName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Primary Contact Number *
                        </label>
                        <input
                          type="tel"
                          value={garageContact}
                          onChange={(e) => {
                            setGarageContact(e.target.value);
                            if (errors.garageContact) setErrors({ ...errors, garageContact: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.garageContact ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="0771234567"
                        />
                        {errors.garageContact && <p className="mt-1 text-xs text-red-400">{errors.garageContact}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Garage Address *
                      </label>
                      <textarea
                        rows={2}
                        value={garageAddress}
                        onChange={(e) => {
                          setGarageAddress(e.target.value);
                          if (errors.garageAddress) setErrors({ ...errors, garageAddress: '' });
                        }}
                        className={`w-full bg-slate-950 border ${
                          errors.garageAddress ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        } rounded-xl px-4 py-2 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
                        placeholder="123 Galle Rd, Colombo 03"
                      />
                      {errors.garageAddress && <p className="mt-1 text-xs text-red-400">{errors.garageAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Operating Hours (Optional)
                        </label>
                        <input
                          type="text"
                          value={garageHours}
                          onChange={(e) => setGarageHours(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200"
                          placeholder="e.g. 24/7 or 8 AM - 6 PM"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Experience Level (Optional)
                        </label>
                        <input
                          type="text"
                          value={garageExperience}
                          onChange={(e) => setGarageExperience(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200"
                          placeholder="e.g. 5+ Years, Established 2018"
                        />
                      </div>
                    </div>

                    {/* Services Offered - Multi Select Pill Box layout */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Services Offered (Select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_GARAGE_SERVICES.map((svc, i) => {
                          const isSelected = servicesOffered.includes(svc);
                          return (
                            <button
                              type="button"
                              key={i}
                              onClick={() => handleServiceToggle(svc)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {svc}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TOWING_OPERATOR Onboarding Fields */}
                {role === 'TOWING_OPERATOR' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={towingCompany}
                          onChange={(e) => {
                            setTowingCompany(e.target.value);
                            if (errors.towingCompany) setErrors({ ...errors, towingCompany: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.towingCompany ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="Apex Recovery Group"
                        />
                        {errors.towingCompany && <p className="mt-1 text-xs text-red-400">{errors.towingCompany}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Dispatch Contact *
                        </label>
                        <input
                          type="tel"
                          value={towingContact}
                          onChange={(e) => {
                            setTowingContact(e.target.value);
                            if (errors.towingContact) setErrors({ ...errors, towingContact: '' });
                          }}
                          className={`w-full bg-slate-950 border ${
                            errors.towingContact ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                          } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                          placeholder="0777654321"
                        />
                        {errors.towingContact && <p className="mt-1 text-xs text-red-400">{errors.towingContact}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Operating Areas / Regions *
                      </label>
                      <input
                        type="text"
                        value={operatingAreas}
                        onChange={(e) => {
                          setOperatingAreas(e.target.value);
                          if (errors.operatingAreas) setErrors({ ...errors, operatingAreas: '' });
                        }}
                        className={`w-full bg-slate-950 border ${
                          errors.operatingAreas ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                        placeholder="e.g. Western Province, Colombo Central, etc."
                      />
                      {errors.operatingAreas && <p className="mt-1 text-xs text-red-400">{errors.operatingAreas}</p>}
                    </div>

                    {/* Supported Vehicle Types Checklist */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Vehicle Types Supported
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {VEHICLE_TYPES.map((type, idx) => {
                          const isSelected = supportedVehicles.includes(type);
                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => handleSupportedVehicleToggle(type)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons Row */}
                <div className="pt-4 border-t border-slate-900 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={loading}
                    className="py-2.5 px-5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-2.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                      loading ? 'opacity-80 pointer-events-none' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Complete Onboarding'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redirect back to Login */}
        <div className="mt-6 pt-6 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
