'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BRAND = '#03b155';

const ORGANIZATIONS = [
  { label: 'GreenWheels HQ — Kenya', value: 'kenya' },
  { label: 'GreenWheels — Ghana', value: 'ghana' },
  { label: 'GreenWheels — Uganda', value: 'uganda' },
  { label: 'GreenWheels — South Africa', value: 'south africa' },
];

export default function LoginPage() {
  const toast = useRef(null);
  const router = useRouter();

  const [org, setOrg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!org || !email || !password) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Missing fields',
        detail: 'Fill in all required fields',
      });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    toast.current?.show({
      severity: 'success',
      summary: 'Access Granted',
      detail: 'Redirecting...',
    });

    // ✅ Redirect to dashboard/home
    router.push('/');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f7f8fa]">

      <Toast ref={toast} />

      {/* ───────── LEFT HERO (CONSISTENT MODERN BACKGROUND) ───────── */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f2fff6] to-[#e9fcef]" />

        {/* SVG blobs (MATCH forgot password style) */}
        <svg className="absolute w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-30" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#03b155" />
        </svg>

        <svg className="absolute w-[500px] h-[500px] bottom-[-180px] right-[-180px] opacity-20" viewBox="0 0 200 200">
          <rect width="200" height="200" rx="60" fill="#03b155" />
        </svg>

        <div className="relative z-10 max-w-2xl text-center px-10">

          {/* BRAND */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
              style={{ background: BRAND }}
            >
              GW
            </div>

            <div className="text-left">
              <div className="text-xl font-bold text-gray-900">
                GreenWheels
              </div>
              <div className="text-xs tracking-widest text-gray-500">
                ERP PLATFORM
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative mx-auto w-full max-w-xl mb-10">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white">

              <Image
                src="/loginImage.png"
                alt="Fleet Operations"
                fill
                priority
                className="object-cover scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Fleet Operations Management System
          </h1>

          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Unified ERP system for dispatch, payments, tracking, and fleet control across Africa.
          </p>

        </div>
      </div>

      {/* ───────── RIGHT FORM ───────── */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Sign in
            </h2>
            <p className="text-sm text-gray-500">
              Access your dashboard securely
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="space-y-5">

              <div>
                <label className="text-sm text-gray-600">Organization</label>
                <Dropdown
                  value={org}
                  options={ORGANIZATIONS}
                  onChange={(e) => setOrg(e.value)}
                  placeholder="Select organization"
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <InputText
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Password</label>
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  feedback={false}
                  toggleMask
                  className="w-full mt-1"
                />
              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.checked)}
                  />
                  <label className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>

                <Link
                  href="/reset-password"
                  className="text-sm font-medium"
                  style={{ color: BRAND }}
                >
                  Forgot Password
                </Link>

              </div>

              <Button
                label="Sign in"
                loading={loading}
                onClick={handleLogin}
                className="w-full"
                style={{ background: BRAND, border: 'none' }}
              />

            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400 flex justify-between">
            <span>ERP v4.2</span>
            <span>Secure Access</span>
          </div>

        </div>
      </div>
    </div>
  );
}