import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(''); // 'USER', 'GARAGE_OWNER', 'TOWING_OPERATOR'

  // Dynamic Role-Specific Fields State
  // 1. User Fields
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  // 2. Garage Owner Fields
  const [garageName, setGarageName] = useState('');
  const [garageContact, setGarageContact] = useState('');
  const [garageAddress, setGarageAddress] = useState('');

  // 3. Towing Operator Fields
  const [towingCompany, setTowingCompany] = useState('');
  const [towingContact, setTowingContact] = useState('');

  // Form Validation & API state
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate fields based on role
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Common validations
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

    if (!role) {
      newErrors.role = 'Role selection is required.';
    }

    // Role-specific validations
    if (role === 'USER') {
      if (!vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle plate number is required.';
      if (!vehicleType) newErrors.vehicleType = 'Vehicle type is required.';
    } else if (role === 'GARAGE_OWNER') {
      if (!garageName.trim()) newErrors.garageName = 'Garage business name is required.';
      if (!garageContact.trim()) newErrors.garageContact = 'Primary contact number is required.';
      if (!garageAddress.trim()) newErrors.garageAddress = 'Garage address is required.';
    } else if (role === 'TOWING_OPERATOR') {
      if (!towingCompany.trim()) newErrors.towingCompany = 'Company name is required.';
      if (!towingContact.trim()) newErrors.towingContact = 'Primary contact number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);

    // Build the user data object based on role
    const baseData = {
      name,
      email,
      password,
      role
    };

    let roleSpecificData = {};
    if (role === 'USER') {
      roleSpecificData = { vehicleNumber, vehicleType };
    } else if (role === 'GARAGE_OWNER') {
      roleSpecificData = {
        garageName,
        contactNumber: garageContact,
        garageAddress
      };
    } else if (role === 'TOWING_OPERATOR') {
      roleSpecificData = {
        companyName: towingCompany,
        contactNumber: towingContact
      };
    }

    const finalUserData = { ...baseData, ...roleSpecificData };

    // Simulate database post delay
    setTimeout(() => {
      const result = register(finalUserData);
      setLoading(false);

      if (result.success) {
        // Redirect user based on role
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
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 font-sans antialiased">
      {/* Brand Header */}
      <div className="mb-6 text-center animate-fade-in">
        <div className="inline-flex w-12 h-12 rounded-xl bg-indigo-600 items-center justify-center font-bold text-white tracking-widest text-lg shadow-lg shadow-indigo-500/25 mb-4">
          RD
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create your account
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Join the ResQDrive emergency response network
        </p>
      </div>

      {/* Card container */}
      <div className="w-full max-w-xl bg-slate-900/60 border border-slate-900 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-slate-800">
        
        {/* API error box */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Common Account Fields */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block border-b border-slate-900 pb-1.5 mb-2">
              1. Account Information
            </span>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                id="name"
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
                disabled={loading}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
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
                disabled={loading}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Passwords Flex Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  id="password"
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
                  disabled={loading}
                />
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
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
                  disabled={loading}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Role Selection Dropdown */}
            <div>
              <label htmlFor="role" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Join As
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  // Clear role-specific fields and errors when switching roles
                  setVehicleNumber('');
                  setVehicleType('');
                  setGarageName('');
                  setGarageContact('');
                  setGarageAddress('');
                  setTowingCompany('');
                  setTowingContact('');
                  setErrors({ ...errors, role: '', vehicleNumber: '', vehicleType: '', garageName: '', garageContact: '', garageAddress: '', towingCompany: '', towingContact: '' });
                }}
                className={`w-full bg-slate-950 border ${
                  errors.role ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                } rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-4 transition-all duration-200 cursor-pointer`}
                disabled={loading}
              >
                <option value="" disabled className="text-slate-700">Select your role</option>
                <option value="USER" className="text-slate-300">Driver (Need Road Assistance)</option>
                <option value="GARAGE_OWNER" className="text-slate-300">Garage Owner (Provide Repair Services)</option>
                <option value="TOWING_OPERATOR" className="text-slate-300">Towing Operator (Provide Tow Services)</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
            </div>
          </div>

          {/* Section: Dynamic Role-Specific Form Fields */}
          {role && (
            <div className="space-y-4 pt-2 border-t border-slate-900/60 transition-all duration-300 animate-slide-down">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block pb-1 border-b border-slate-900/60 mb-2">
                2. Role Details
              </span>

              {/* 1. USER Fields */}
              {role === 'USER' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vehicleNumber" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Vehicle Plate Number
                    </label>
                    <input
                      id="vehicleNumber"
                      type="text"
                      value={vehicleNumber}
                      onChange={(e) => {
                        setVehicleNumber(e.target.value);
                        if (errors.vehicleNumber) setErrors({ ...errors, vehicleNumber: '' });
                      }}
                      className={`w-full bg-slate-950 border ${
                        errors.vehicleNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                      placeholder="e.g. WP-ABC-1234"
                      disabled={loading}
                    />
                    {errors.vehicleNumber && <p className="mt-1 text-xs text-red-400">{errors.vehicleNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="vehicleType" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      value={vehicleType}
                      onChange={(e) => {
                        setVehicleType(e.target.value);
                        if (errors.vehicleType) setErrors({ ...errors, vehicleType: '' });
                      }}
                      className={`w-full bg-slate-950 border ${
                        errors.vehicleType ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-4 transition-all duration-200 cursor-pointer`}
                      disabled={loading}
                    >
                      <option value="" disabled className="text-slate-700">Select vehicle type</option>
                      <option value="Car" className="text-slate-300">Car</option>
                      <option value="Motorcycle" className="text-slate-300">Motorcycle</option>
                      <option value="Truck" className="text-slate-300">Truck</option>
                      <option value="SUV" className="text-slate-300">SUV</option>
                      <option value="Van" className="text-slate-300">Van</option>
                    </select>
                    {errors.vehicleType && <p className="mt-1 text-xs text-red-400">{errors.vehicleType}</p>}
                  </div>
                </div>
              )}

              {/* 2. GARAGE_OWNER Fields */}
              {role === 'GARAGE_OWNER' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="garageName" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Garage Name
                      </label>
                      <input
                        id="garageName"
                        type="text"
                        value={garageName}
                        onChange={(e) => {
                          setGarageName(e.target.value);
                          if (errors.garageName) setErrors({ ...errors, garageName: '' });
                        }}
                        className={`w-full bg-slate-950 border ${
                          errors.garageName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                        placeholder="e.g. Metro Auto Care"
                        disabled={loading}
                      />
                      {errors.garageName && <p className="mt-1 text-xs text-red-400">{errors.garageName}</p>}
                    </div>

                    <div>
                      <label htmlFor="garageContact" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Contact Number
                      </label>
                      <input
                        id="garageContact"
                        type="tel"
                        value={garageContact}
                        onChange={(e) => {
                          setGarageContact(e.target.value);
                          if (errors.garageContact) setErrors({ ...errors, garageContact: '' });
                        }}
                        className={`w-full bg-slate-950 border ${
                          errors.garageContact ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                        placeholder="e.g. 0771234567"
                        disabled={loading}
                      />
                      {errors.garageContact && <p className="mt-1 text-xs text-red-400">{errors.garageContact}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="garageAddress" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Garage Address
                    </label>
                    <textarea
                      id="garageAddress"
                      rows={2}
                      value={garageAddress}
                      onChange={(e) => {
                        setGarageAddress(e.target.value);
                        if (errors.garageAddress) setErrors({ ...errors, garageAddress: '' });
                      }}
                      className={`w-full bg-slate-950 border ${
                        errors.garageAddress ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
                      placeholder="e.g. 123 Galle Rd, Colombo 03"
                      disabled={loading}
                    />
                    {errors.garageAddress && <p className="mt-1 text-xs text-red-400">{errors.garageAddress}</p>}
                  </div>
                </div>
              )}

              {/* 3. TOWING_OPERATOR Fields */}
              {role === 'TOWING_OPERATOR' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="towingCompany" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      id="towingCompany"
                      type="text"
                      value={towingCompany}
                      onChange={(e) => {
                        setTowingCompany(e.target.value);
                        if (errors.towingCompany) setErrors({ ...errors, towingCompany: '' });
                      }}
                      className={`w-full bg-slate-950 border ${
                        errors.towingCompany ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                      placeholder="e.g. Express Towing Ltd"
                      disabled={loading}
                    />
                    {errors.towingCompany && <p className="mt-1 text-xs text-red-400">{errors.towingCompany}</p>}
                  </div>

                  <div>
                    <label htmlFor="towingContact" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Contact Number
                    </label>
                    <input
                      id="towingContact"
                      type="tel"
                      value={towingContact}
                      onChange={(e) => {
                        setTowingContact(e.target.value);
                        if (errors.towingContact) setErrors({ ...errors, towingContact: '' });
                      }}
                      className={`w-full bg-slate-950 border ${
                        errors.towingContact ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:ring-4 transition-all duration-200`}
                      placeholder="e.g. 0777654321"
                      disabled={loading}
                    />
                    {errors.towingContact && <p className="mt-1 text-xs text-red-400">{errors.towingContact}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10 ${
              loading ? 'opacity-85 pointer-events-none' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Bottom Navigation */}
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
