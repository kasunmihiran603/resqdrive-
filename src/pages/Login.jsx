import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Errors & Status State
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);
    
    // Slight artificial delay to make the UX feel premium and simulate network response
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        // Redirect according to user role
        switch (result.user.role) {
          case 'ADMIN':
            navigate('/admin');
            break;
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

  // Forgot Password placeholder handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password recovery is scheduled for a future phase. Please use the pre-seeded credentials to log in.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 font-sans antialiased">
      {/* Brand Header */}
      <div className="mb-8 text-center animate-fade-in">
        <div className="inline-flex w-12 h-12 rounded-xl bg-indigo-600 items-center justify-center font-bold text-white tracking-widest text-lg shadow-lg shadow-indigo-500/25 mb-4">
          RD
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Sign in to ResQDrive
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Vehicle Emergency Assistance Platform
        </p>
      </div>

      {/* Card container */}
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-900 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-slate-800">
        
        {/* Banner error message */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input group */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
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
                } rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:ring-4 transition-all duration-200`}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password input group */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                onClick={handleForgotPassword}
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={`w-full bg-slate-950 border ${
                  errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                } rounded-xl pl-4 pr-12 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:ring-4 transition-all duration-200`}
                placeholder="••••••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me checkbox (UI only) */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 bg-slate-950 border border-slate-800 rounded accent-indigo-500 focus:outline-none focus:ring-0 cursor-pointer"
              disabled={loading}
            />
            <label htmlFor="remember-me" className="ml-2.5 text-xs text-slate-400 font-medium cursor-pointer selection:bg-transparent">
              Remember me on this device
            </label>
          </div>

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
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Info Box about Seed Data */}
        <div className="mt-6 pt-6 border-t border-slate-900 text-center">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-left mb-4">
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Testing Credentials</span>
            <p className="text-[10px] text-slate-500 leading-normal">
              <strong>User:</strong> user@resqdrive.com (UserPassword123)<br />
              <strong>Garage:</strong> garage@resqdrive.com (GaragePassword123)<br />
              <strong>Towing:</strong> towing@resqdrive.com (TowingPassword123)<br />
              <strong>Admin:</strong> admin@resqdrive.com (AdminPassword123)
            </p>
          </div>
          
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
