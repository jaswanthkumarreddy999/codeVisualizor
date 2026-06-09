'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFromStorage = useCallback(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUserStr = localStorage.getItem('auth_user');

    setToken(prev => (prev !== storedToken ? storedToken : prev));
    setUser(prev => {
      const newUser = storedUserStr ? JSON.parse(storedUserStr) : null;
      // Stringify comparison to check if content changed
      if (JSON.stringify(prev) !== JSON.stringify(newUser)) {
        return newUser;
      }
      return prev;
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFromStorage();
    // Listen for auth changes (e.g. after OAuth callback)
    window.addEventListener('auth_changed', loadFromStorage);
    return () => window.removeEventListener('auth_changed', loadFromStorage);
  }, [loadFromStorage]);

  const signIn = useCallback(() => {
    // Wake up the Spring Boot backend first (free tier cold start),
    // then redirect to Google OAuth
    const btn = document.querySelector('[data-signin-btn]') as HTMLButtonElement | null;
    if (btn) { btn.disabled = true; btn.textContent = 'Connecting...'; }

    fetch('/api/public/folders', { method: 'GET' })
      .finally(() => {
        window.location.href = '/oauth2/authorization/google';
      });
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify({
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role
      }));
      setToken(data.token);
      setUser({
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role
      });
      window.dispatchEvent(new Event('auth_changed'));
      return { success: true };
    }
    const err = await res.json();
    return { success: false, error: err.error || 'Invalid credentials' };
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {}
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event('auth_changed'));
  }, [token]);

  // Helper: get auth headers for API calls
  const authHeaders = useCallback((): Record<string, string> =>
    token ? { Authorization: `Bearer ${token}` } : {}, [token]);

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return { user, token, loading, isLoggedIn, isAdmin, signIn, login, signOut, authHeaders };
}
