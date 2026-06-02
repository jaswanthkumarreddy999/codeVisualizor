'use client';

import React, { useState } from 'react';
import { LogIn, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const AuthButton: React.FC = () => {
  const { user, loading, isLoggedIn, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      // Wake up the Spring Boot backend first (free tier cold start ~60s)
      await fetch('/api/public/folders', { method: 'GET' }).catch(() => {});
    } finally {
      window.location.href = '/oauth2/authorization/google';
    }
  };

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-theme-tertiary animate-pulse" />;
  }

  if (!isLoggedIn) {
    return (
      <button
        onClick={handleSignIn}
        disabled={signingIn}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary transition-colors border border-theme disabled:opacity-60 disabled:cursor-wait"
        title="Sign in with Google"
      >
        {signingIn ? (
          <>
            <div className="w-3 h-3 border-2 border-theme-secondary border-t-accent rounded-full animate-spin" />
            <span className="hidden sm:inline">Connecting...</span>
          </>
        ) : (
          <>
            <LogIn size={15} />
            <span className="hidden sm:inline">Sign In</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-theme-tertiary transition-colors"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <span className="text-xs font-bold text-theme-primary hidden sm:inline max-w-[100px] truncate">
          {user?.name}
        </span>
        {user?.role === 'admin' && (
          <span className="text-[9px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-full hidden sm:inline">
            ADMIN
          </span>
        )}
        <ChevronDown size={12} className="text-theme-secondary" />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-theme-secondary border border-theme rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-theme">
              <p className="text-sm font-bold text-theme-primary truncate">{user?.name}</p>
              <p className="text-xs text-theme-secondary truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); signOut(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-theme-secondary hover:bg-theme-tertiary hover:text-red-400 transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};
