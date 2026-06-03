'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

const BRAND = '#03b155';

export default function ForgotPasswordPage() {
  const toast = useRef(null);
  const { dark, toggle } = useThemeStore();

  const [step,         setStep]         = useState('EMAIL');
  const [email,        setEmail]        = useState('');
  const [otp,          setOtp]          = useState('');
  const [password,     setPassword]     = useState('');
  const [confirm,      setConfirm]      = useState('');
  const [loading,      setLoading]      = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      toast.current?.show({ severity: 'warn', summary: 'Email required', detail: 'Enter your registered email' });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('OTP');
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.current?.show({ severity: 'warn', summary: 'OTP required', detail: 'Enter verification code' });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep('RESET');
  };

  const handleResetPassword = async () => {
    if (!password || password !== confirm) {
      toast.current?.show({ severity: 'error', summary: 'Password mismatch', detail: 'Ensure passwords match' });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('EMAIL');
  };

  const STEPS = ['EMAIL', 'OTP', 'RESET'];
  const stepIndex = STEPS.indexOf(step);

  const stepLabels = {
    EMAIL: 'Enter your email to receive a verification code',
    OTP:   'Enter the OTP sent to your email',
    RESET: 'Create a new secure password',
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f7f8fa] dark:bg-zinc-950 transition-colors duration-300">

      <Toast ref={toast} />

      {/* ── THEME TOGGLE ── */}
      <button
        onClick={toggle}
        className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 shadow-sm hover:shadow-md transition-all"
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* ── LEFT HERO ── */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f2fff6] to-[#e9fcef] dark:from-zinc-950 dark:via-zinc-900 dark:to-[#0c1f13] transition-colors duration-300" />

        <svg className="absolute w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-20 dark:opacity-10" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#03b155" />
        </svg>
        <svg className="absolute w-[500px] h-[500px] bottom-[-180px] right-[-180px] opacity-15 dark:opacity-[0.07]" viewBox="0 0 200 200">
          <rect width="200" height="200" rx="60" fill="#03b155" />
        </svg>

        <div className="relative z-10 text-center max-w-md px-10">

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md" style={{ background: BRAND }}>
              GW
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-gray-900 dark:text-zinc-100">GreenWheels</div>
              <div className="text-xs tracking-widest text-gray-400 dark:text-zinc-500">OS PLATFORM</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3">
            Secure Account Recovery
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Restore access to your operations dashboard safely and securely.
          </p>

          {/* Step progress visual */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  i < stepIndex  ? 'text-white'                                     : ''
                } ${
                  i === stepIndex ? 'text-white ring-4 ring-[#03b155]/20'            : ''
                } ${
                  i > stepIndex  ? 'text-zinc-400 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-800' : ''
                }`}
                  style={i <= stepIndex ? { background: BRAND } : {}}
                >
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-10 h-px transition-all duration-300 ${i < stepIndex ? 'bg-[#03b155]' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">Reset Password</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">{stepLabels[step]}</p>
          </div>

          {/* Step bar */}
          <div className="flex gap-1.5 mb-6">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${i > stepIndex ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
                style={i <= stepIndex ? { background: BRAND } : {}}
              />
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="space-y-5">

              {/* EMAIL STEP */}
              {step === 'EMAIL' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-zinc-400">Email</label>
                    <InputText
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full mt-1"
                    />
                  </div>
                  <Button
                    label="Send Verification Code"
                    loading={loading}
                    onClick={handleSendOTP}
                    className="w-full"
                    style={{ background: BRAND, border: 'none' }}
                  />
                </>
              )}

              {/* OTP STEP */}
              {step === 'OTP' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-zinc-400">Verification Code</label>
                    <InputText
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full mt-1 text-center tracking-[0.3em]"
                    />
                  </div>
                  <Button
                    label="Verify Code"
                    loading={loading}
                    onClick={handleVerifyOTP}
                    className="w-full"
                    style={{ background: BRAND, border: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setStep('EMAIL')}
                    className="text-sm text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                  >
                    ← Change email
                  </button>
                </>
              )}

              {/* RESET STEP */}
              {step === 'RESET' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-zinc-400">New Password</label>
                    <div className="relative mt-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full h-11 px-3 pr-14 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#03b155] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-zinc-400">Confirm Password</label>
                    <div className="relative mt-1">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full h-11 px-3 pr-14 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#03b155] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                      >
                        {showConfirm ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <Button
                    label="Update Password"
                    loading={loading}
                    onClick={handleResetPassword}
                    className="w-full"
                    style={{ background: BRAND, border: 'none' }}
                  />
                </>
              )}

            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400 dark:text-zinc-600 flex justify-between px-1">
            <span>Secure Recovery System</span>
            <span>OS v4.2</span>
          </div>

        </div>
      </div>
    </div>
  );
}
