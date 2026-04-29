'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function ForgotPasswordPage() {
  const toast = useRef(null);

  const [step, setStep] = useState('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const BRAND = '#03b155';

  const handleSendOTP = async () => {
    if (!email) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Email required',
        detail: 'Enter your registered email',
      });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    setStep('OTP');
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.current?.show({
        severity: 'warn',
        summary: 'OTP required',
        detail: 'Enter verification code',
      });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    setStep('RESET');
  };

  const handleResetPassword = async () => {
    if (!password || password !== confirm) {
      toast.current?.show({
        severity: 'error',
        summary: 'Password mismatch',
        detail: 'Ensure passwords match',
      });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    setStep('EMAIL');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f7f8fa]">

      <Toast ref={toast} />

      {/* LEFT HERO */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f2fff6] to-[#e9fcef]" />

        <svg className="absolute w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-30" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#03b155" />
        </svg>

        <svg className="absolute w-[500px] h-[500px] bottom-[-180px] right-[-180px] opacity-20" viewBox="0 0 200 200">
          <rect width="200" height="200" rx="60" fill="#03b155" />
        </svg>

        <div className="relative z-10 text-center max-w-md px-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Secure Account Recovery
          </h1>

          <p className="text-sm text-gray-500">
            Restore access to your ERP dashboard safely and securely.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Reset Password
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {step === 'EMAIL' && 'Enter your email to receive a verification code'}
                {step === 'OTP' && 'Enter the OTP sent to your email'}
                {step === 'RESET' && 'Create a new secure password'}
              </p>
            </div>

            {/* STEP INDICATOR */}
            <div className="flex gap-2 mb-6">
              {['EMAIL', 'OTP', 'RESET'].map((s) => (
                <div
                  key={s}
                  className="flex-1 h-1 rounded-full"
                  style={{
                    background: step === s ? BRAND : '#e5e7eb'
                  }}
                />
              ))}
            </div>

            <div className="space-y-5">

              {/* EMAIL STEP */}
              {step === 'EMAIL' && (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
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
                    <label className="text-sm text-gray-600">Verification Code</label>
                    <InputText
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full mt-1 text-center tracking-widest"
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
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Change email
                  </button>
                </>
              )}

              {/* RESET STEP (FIXED PASSWORD WIDTH ✔) */}
              {step === 'RESET' && (
                <>
                  <div>
                    <label className="text-sm text-gray-600">New Password</label>
                    <Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      feedback={false}
                      toggleMask
                      className="w-full mt-1"
                      inputClassName="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Confirm Password</label>
                    <Password
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      feedback={false}
                      toggleMask
                      className="w-full mt-1"
                      inputClassName="w-full"
                    />
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

          <div className="mt-6 text-xs text-gray-400 flex justify-between px-2">
            <span>Secure Recovery System</span>
            <span>ERP v4.2</span>
          </div>

        </div>
      </div>
    </div>
  );
}