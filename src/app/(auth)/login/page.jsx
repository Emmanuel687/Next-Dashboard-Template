'use client';

/**
 * LoginPage — GreenWheels OS2 sign-in screen.
 *
 * Adopted from the Greenwheels-ERP design:
 *   - Email + password form (replaces magic-link flow)
 *   - Password visibility toggle (Eye / EyeOff)
 *   - Inline validation error beneath the password field
 *   - Google SSO button (restricted to @greenwheels.africa)
 *   - Split-screen layout: form left, brand panel right
 *
 * Demo credentials (remove before connecting a real auth layer):
 *   Email:    demo@greenwheels.africa
 *   Password: Demo123*
 */

import { useState, useRef } from 'react';
import { useRouter }        from 'next/navigation';
import { Toast }            from 'primereact/toast';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useThemeStore }    from '@/store/useThemeStore';

const BRAND    = '#03b155';
const LOGO_URL = 'https://greenwheels.africa/wp-content/uploads/2025/08/Logo-Horizontal01.svg';

const DEMO_EMAIL    = 'demo@greenwheels.africa';
const DEMO_PASSWORD = 'Demo123*';

const FEATURES = [
  'Real-time fleet, leasing & energy in one place',
  'From first enquiry to signed lease-to-own',
  'Built for e-mobility operations across Africa',
];

// ─── Sub-components ───────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function Spinner({ light = false }) {
  return (
    <span
      aria-hidden="true"
      className={`w-4 h-4 rounded-full border-2 animate-spin ${
        light
          ? 'border-white/30 border-t-white'
          : 'border-zinc-200 border-t-zinc-500 dark:border-zinc-700 dark:border-t-zinc-300'
      }`}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function LoginPage() {
  const toast  = useRef(null);
  const router = useRouter();
  const { dark, toggle } = useThemeStore();

  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [showPassword,  setShowPassword]  = useState(false);
  const [error,         setError]         = useState('');
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function clearError() {
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Try demo@greenwheels.africa / Demo123*');
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setGoogleLoading(false);
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-colors duration-300">
      <Toast ref={toast} />

      {/* ── Theme toggle (fixed) ── */}
      <button
        type="button"
        onClick={toggle}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 shadow-sm hover:shadow-md transition-all"
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* ── LEFT: Form panel ── */}
      <section className="flex items-center justify-center px-8 py-14 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="w-full max-w-[400px]">

          {/* Logo */}
          <div className="mb-9">
            <img
              src={LOGO_URL}
              alt="GreenWheels"
              className="h-9 w-auto object-contain object-left dark:brightness-0 dark:invert"
              style={{ maxWidth: 200 }}
            />
          </div>

          {/* Heading */}
          <h1 className="text-[26px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-1">
            Sign in to GreenWheels
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
            Internal team access
          </p>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full h-11 flex items-center justify-center gap-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 mb-2"
          >
            {googleLoading ? <Spinner /> : <GoogleIcon />}
            Continue with Google
          </button>
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mb-6">
            Restricted to @greenwheels.africa accounts
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">or continue with email</span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Work email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                placeholder="you@greenwheels.africa"
                className="w-full h-11 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#03b155]/25 focus:border-[#03b155] transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <a
                  href="/reset-password"
                  className="text-xs font-medium hover:opacity-75 transition-opacity"
                  style={{ color: BRAND }}
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Enter your password"
                  className={[
                    'w-full h-11 pl-3.5 pr-10 rounded-lg border',
                    'bg-white dark:bg-zinc-900',
                    'text-sm text-zinc-900 dark:text-zinc-100',
                    'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
                    'focus:outline-none focus:ring-2 focus:ring-[#03b155]/25 focus:border-[#03b155]',
                    'transition-all',
                    error
                      ? 'border-red-400 dark:border-red-500'
                      : 'border-zinc-200 dark:border-zinc-700',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Inline error */}
              {error && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-1"
              style={{ background: BRAND }}
            >
              {loading ? <Spinner light /> : 'Sign In'}
            </button>

          </form>

          {/* External partner */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            External partner?{' '}
            <a
              href="#"
              className="font-medium hover:opacity-75 transition-opacity"
              style={{ color: BRAND }}
            >
              Create an account
            </a>
          </p>

        </div>
      </section>

      {/* ── RIGHT: Brand panel ── */}
      <section
        className="hidden lg:flex flex-col justify-center px-14 py-14"
        style={{ background: 'linear-gradient(145deg, #03b155 0%, #028c42 100%)' }}
        aria-hidden="true"
      >
        {/* Logo watermark */}
        <div
          className="inline-flex items-center self-start mb-12 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <img
            src={LOGO_URL}
            alt="GreenWheels"
            className="h-6 w-auto object-contain"
            style={{ maxWidth: 140, filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Headline */}
        <h2 className="text-[34px] font-bold text-white leading-snug mb-8 max-w-[340px]">
          The operating system<br />for e-mobility leasing.
        </h2>

        {/* Feature bullets */}
        <ul className="space-y-3.5">
          {FEATURES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg
                className="mt-0.5 shrink-0"
                width="17" height="17" viewBox="0 0 24 24"
                fill="none" stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-sm text-white/90 leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
