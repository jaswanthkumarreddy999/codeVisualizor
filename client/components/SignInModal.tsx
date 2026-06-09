'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SignInModalProps {
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const { login, signIn } = useAuth();
  const [isManual, setIsManual] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-theme-secondary border border-theme rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-theme flex justify-between items-center bg-theme-tertiary/20">
          <h2 className="text-xl font-bold text-theme-primary">Sign In</h2>
          <button onClick={onClose} className="p-2 hover:bg-theme-tertiary rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {!isManual ? (
            <div className="space-y-4">
              <button
                onClick={signIn}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white text-black rounded-xl font-black hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-white/10"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-theme"></div></div>
                <div className="relative flex justify-center text-xs uppercase font-bold text-theme-secondary"><span className="px-3 bg-theme-secondary">OR</span></div>
              </div>

              <button
                onClick={() => setIsManual(true)}
                className="w-full py-4 px-6 bg-theme-tertiary/50 border border-theme hover:border-accent/50 text-theme-primary rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Mail size={18} /> Sign in with Email
              </button>
              
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 mt-6">
                <p className="text-[10px] uppercase font-black text-accent tracking-widest mb-1">Developer Default</p>
                <p className="text-sm font-code text-theme-primary opacity-80">
                  Email: <span className="text-accent underline">tjaswanthkumarreddy@gmail.com</span><br/>
                  Pass: <span className="text-accent">admin123</span>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2 mb-4">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-secondary" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-theme-tertiary border border-theme rounded-xl py-3 pl-12 pr-4 text-theme-primary focus:outline-none focus:border-accent transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-secondary" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-theme-tertiary border border-theme rounded-xl py-3 pl-12 pr-4 text-theme-primary focus:outline-none focus:border-accent transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-6"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Sign In'}
                {!loading && <ChevronRight size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setIsManual(false)}
                className="w-full text-center text-sm font-bold text-theme-secondary hover:text-theme-primary transition-colors mt-4"
              >
                ← Back to other options
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
