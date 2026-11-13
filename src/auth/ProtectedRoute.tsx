import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { navigate } from '../lib/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const next = encodeURIComponent(window.location.pathname);
      navigate('/login?next=' + next);
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#03050C] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-[#53D9FF]" />
          <p className="text-sm text-[#9EABCA]">Checking your session…</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
