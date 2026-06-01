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
    try {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser  = localStorage.getItem('auth_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        setToken(null);
        setUser(null);
      }
    } catch {
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFromStorage();
    // Listen for auth changes (e.g. after OAuth callback)
    window.addEventListener('auth_changed', loadFromStorage);
    return () => window.removeEventListener('auth_changed', loadFromStorage);
  }, [loadFromStorage]);

  const signIn = () => {
    // Redirect to Spring Boot Google OAuth
    window.location.href = '/oauth2/authorization/google';
  };

  const signOut = async () => {
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
  };

  // Helper: get auth headers for API calls
  const authHeaders = (): Record<string, string> =>
    token ? { Authorization: `Bearer ${token}` } : {};

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return { user, token, loading, isLoggedIn, isAdmin, signIn, signOut, authHeaders };
}
