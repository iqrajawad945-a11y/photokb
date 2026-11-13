import React, { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { isSupabaseConfigured } from '../lib/supabase';
import { navigate } from '../lib/navigation';

export type AuthPageMode = 'login' | 'signup' | 'forgot' | 'reset';

const titles: Record<AuthPageMode, string> = {
  login: 'Welcome back',
  signup: 'Create your PhotoKB account',
  forgot: 'Reset your password',
  reset: 'Choose a new password',
};

export function AuthPage({ mode }: { mode: AuthPageMode }) {
  const {
    user,
    loading: authLoading,
    signIn,
    signUp,
    sendPasswordReset,
    updatePassword,
  } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!authLoading && user && (mode === 'login' || mode === 'signup')) {
      navigate('/dashboard');
    }
  }, [authLoading, user, mode]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setNotice('');

    if (!isSupabaseConfigured) {
      setErrorMessage('Supabase configuration is missing. Add the two VITE_SUPABASE environment variables and redeploy.');
      return;
    }

    if (mode === 'signup' && fullName.trim().length < 2) {
      setErrorMessage('Please enter your name (at least 2 characters).');
      return;
    }

    if ((mode === 'signup' || mode === 'reset') && password.length < 8) {
      setErrorMessage('Use a password with at least 8 characters.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage('The passwords do not match.');
      return;
    }

    setBusy(true);
    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
        const params = new URLSearchParams(window.location.search);
        const requested = params.get('next');
        const safeNext = requested && requested.startsWith('/') && !requested.startsWith('//')
          ? requested
          : '/dashboard';
        navigate(safeNext);
      } else if (mode === 'signup') {
        const hasSession = await signUp(email.trim(), password, fullName);
        if (hasSession) {
          navigate('/dashboard');
        } else {
          setNotice('Account created. Check your email for the confirmation link, then sign in.');
        }
      } else if (mode === 'forgot') {
        await sendPasswordReset(email.trim());
        setNotice('Password reset link sent. Check your inbox and open the link on this website.');
      } else {
        await updatePassword(password);
        setNotice('Your password has been updated.');
        window.setTimeout(() => navigate('/dashboard'), 700);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const switchMode = (nextMode: AuthPageMode) => {
    setErrorMessage('');
    setNotice('');
    navigate('/' + (nextMode === 'login' ? 'login' : nextMode === 'signup' ? 'signup' : nextMode === 'forgot' ? 'forgot-password' : 'reset-password'));
  };

  return (
    <main className="min-h-screen bg-[#03050C] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9EABCA] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to PhotoKB
        </button>

        <section className="rounded-3xl border border-white/10 bg-[#0A1020] p-7 shadow-2xl shadow-black/30 sm:p-9">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2934FF] to-[#53D9FF]">
              <Sparkles size={21} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">Photo<span className="text-[#53D9FF]">KB</span></div>
              <div className="text-xs text-[#8492B5]">Private image tools, simple account access</div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">{titles[mode]}</h1>
            <p className="mt-2 text-sm leading-6 text-[#9EABCA]">
              {mode === 'login' && 'Sign in to manage your PhotoKB account.'}
              {mode === 'signup' && 'Create an account with your email and a secure password.'}
              {mode === 'forgot' && 'We will email you a secure password reset link.'}
              {mode === 'reset' && 'Enter a new password for your account.'}
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-200">
              Authentication is not active until the Supabase environment variables are configured.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <label className="block space-y-2 text-sm font-medium text-[#DDE5FF]">
                Full name
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  maxLength={100}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#050A16] px-4 py-3 text-white outline-none transition focus:border-[#53D9FF]/60"
                  placeholder="Your name"
                />
              </label>
            )}

            {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
              <label className="block space-y-2 text-sm font-medium text-[#DDE5FF]">
                Email address
                <span className="relative block">
                  <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7080A5]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#050A16] py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#53D9FF]/60"
                    placeholder="you@example.com"
                  />
                </span>
              </label>
            )}

            {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
              <label className="block space-y-2 text-sm font-medium text-[#DDE5FF]">
                {mode === 'reset' ? 'New password' : 'Password'}
                <span className="relative block">
                  <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7080A5]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={mode === 'login' ? 1 : 8}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#050A16] py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#53D9FF]/60"
                    placeholder={mode === 'login' ? 'Your password' : 'At least 8 characters'}
                  />
                </span>
              </label>
            )}

            {mode === 'signup' && (
              <label className="block space-y-2 text-sm font-medium text-[#DDE5FF]">
                Confirm password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#050A16] px-4 py-3 text-white outline-none transition focus:border-[#53D9FF]/60"
                  placeholder="Enter password again"
                />
              </label>
            )}

            {errorMessage && (
              <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                {errorMessage}
              </p>
            )}
            {notice && (
              <p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !isSupabaseConfigured}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2934FF] to-[#2677FF] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/50 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mode === 'login' && (busy ? 'Signing in…' : 'Sign in')}
              {mode === 'signup' && (busy ? 'Creating account…' : 'Create account')}
              {mode === 'forgot' && (busy ? 'Sending link…' : 'Send reset link')}
              {mode === 'reset' && (busy ? 'Updating password…' : 'Update password')}
              {!busy && <ShieldCheck size={16} />}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#9EABCA]">
            {mode === 'login' && (
              <>
                <button type="button" onClick={() => switchMode('signup')} className="hover:text-white">Create account</button>
                <button type="button" onClick={() => switchMode('forgot')} className="hover:text-white">Forgot password?</button>
              </>
            )}
            {mode === 'signup' && (
              <button type="button" onClick={() => switchMode('login')} className="hover:text-white">Already have an account? Sign in</button>
            )}
            {mode === 'forgot' && (
              <button type="button" onClick={() => switchMode('login')} className="hover:text-white">Back to sign in</button>
            )}
            {mode === 'reset' && <span>Use at least 8 characters.</span>}
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#7180A4]">
          Photo compression remains in your browser. Your images and signatures are not uploaded to your account.
        </p>
      </div>
    </main>
  );
}
