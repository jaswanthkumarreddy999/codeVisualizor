'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token  = params.get('token');
    const name   = params.get('name');
    const email  = params.get('email');
    const avatar = params.get('avatar');
    const role   = params.get('role');

    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify({ name, email, avatar, role }));
      window.dispatchEvent(new Event('auth_changed'));
    }
    router.replace('/');
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-theme-main text-theme-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-theme-secondary">Signing you in...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
