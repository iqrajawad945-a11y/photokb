import React, { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, LogOut, Save, UserRound } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { requireSupabase } from '../lib/supabase';
import { navigate } from '../lib/navigation';

export function DashboardPage() {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      if (!user) return;
      try {
        const { data, error } = await requireSupabase()
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (active) {
          setFullName(data?.full_name ?? String(user.user_metadata?.full_name ?? ''));
        }
      } catch (error) {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : 'Could not load your profile.');
        }
      } finally {
        if (active) setLoadingProfile(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [user]);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');
    setErrorMessage('');
    try {
      const { error } = await requireSupabase()
        .from('profiles')
        .upsert({ id: user.id, full_name: fullName.trim() || null });
      if (error) throw error;
      setMessage('Your profile has been saved.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not sign out.');
    }
  };

  return (
    <main className="min-h-screen bg-[#03050C] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-[#9EABCA] hover:text-white">
            <ArrowLeft size={16} /> PhotoKB home
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[#C6D0EA] hover:border-white/25 hover:text-white"
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#53D9FF]">Your account</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome to PhotoKB</h1>
          <p className="mt-3 text-sm text-[#9EABCA]">Manage your basic account details here.</p>
        </div>

        <section className="max-w-2xl rounded-3xl border border-white/10 bg-[#0A1020] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17264A] text-[#53D9FF]">
              <UserRound size={22} />
            </div>
            <div>
              <h2 className="font-bold">Profile details</h2>
              <p className="text-xs text-[#8492B5]">{user?.email}</p>
            </div>
          </div>

          {loadingProfile ? (
            <p className="text-sm text-[#9EABCA]">Loading profile…</p>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <label className="block space-y-2 text-sm font-medium text-[#DDE5FF]">
                Full name
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  maxLength={100}
                  className="w-full rounded-xl border border-white/10 bg-[#050A16] px-4 py-3 text-white outline-none focus:border-[#53D9FF]/60"
                  placeholder="Your name"
                />
              </label>
              {errorMessage && <p role="alert" className="text-sm text-red-300">{errorMessage}</p>}
              {message && <p role="status" className="text-sm text-emerald-300">{message}</p>}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2934FF] px-5 py-3 text-sm font-bold hover:bg-[#4257FF] disabled:opacity-50"
              >
                <Save size={16} /> {saving ? 'Saving…' : 'Save profile'}
              </button>
            </form>
          )}
        </section>

        <p className="mt-7 max-w-2xl text-xs leading-5 text-[#7180A4]">
          This account does not store uploaded photos, signatures, compression results, or file history. Image processing stays on your device.
        </p>
      </div>
    </main>
  );
}
