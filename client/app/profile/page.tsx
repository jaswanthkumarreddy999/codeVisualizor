'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, MapPin, Calendar, Briefcase, Phone, FileText, Save, CheckCircle, ChevronLeft, Lock, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user, token, authHeaders } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    age: '',
    dob: '',
    professionalRole: 'Student',
    bio: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!token) return;
      try {
        const res = await fetch('/api/user/profile', {
          headers: authHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            email: data.email || '',
            contact: data.contact || '',
            address: data.address || '',
            age: data.age?.toString() || '',
            dob: data.dob || '',
            professionalRole: data.professionalRole || 'Student',
            bio: data.bio || ''
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null
        })
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-100">Please sign in to view your profile</h1>
          <Link href="/" className="inline-block bg-indigo-600 px-6 py-2 rounded-lg text-white font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans pb-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">User Profile</h1>
            <p className="text-slate-400">Manage your personal information and professional details.</p>
          </div>
          
          {user?.avatar && (
            <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/10" />
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ProfileInput 
                label="Full Name" 
                icon={<User size={18} />} 
                value={formData.name} 
                onChange={(v: string) => setFormData({...formData, name: v})} 
                placeholder="John Doe" 
              />
              <ProfileInput 
                label="Email Address" 
                icon={<Mail size={18} />} 
                value={formData.email} 
                disabled 
                placeholder="john@example.com" 
              />
              <ProfileInput 
                label="Contact Number" 
                icon={<Phone size={18} />} 
                value={formData.contact} 
                onChange={(v: string) => setFormData({...formData, contact: v})} 
                placeholder="+1 234 567 890" 
              />
              <div className="grid grid-cols-2 gap-4">
                <ProfileInput 
                  label="Age" 
                  icon={<Calendar size={18} />} 
                  value={formData.age} 
                  type="number"
                  onChange={(v: string) => setFormData({...formData, age: v})} 
                  placeholder="25" 
                />
                <ProfileInput 
                  label="Date of Birth" 
                  icon={<Calendar size={18} />} 
                  value={formData.dob} 
                  type="date"
                  onChange={(v: string) => setFormData({...formData, dob: v})} 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                  <Briefcase size={18} /> Professional Role
                </label>
                <select 
                  value={formData.professionalRole}
                  onChange={(e) => setFormData({...formData, professionalRole: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer backdrop-blur-md"
                >
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Educator/Trainer">Educator/Trainer</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <ProfileInput 
                label="Address" 
                icon={<MapPin size={18} />} 
                value={formData.address} 
                onChange={(v: string) => setFormData({...formData, address: v})} 
                placeholder="City, Country" 
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                  <FileText size={18} /> About Me (Bio)
                </label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all backdrop-blur-md resize-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6 flex items-center justify-between">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="text-green-400 flex items-center gap-2 font-medium"
                >
                  <CheckCircle size={20} /> Changes saved successfully!
                </motion.div>
              )}
              
              <button 
                type="submit" 
                disabled={saving}
                className="ml-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center gap-2"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        )}

        <div className="mt-20 pt-12 border-t border-slate-800/50">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lock size={24} className="text-indigo-500" /> Security Settings
          </h2>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
            <div className="max-w-md">
              <h3 className="text-lg font-bold mb-2">Set Account Password</h3>
              <p className="text-slate-400 text-sm mb-6">
                Enable manual email/password login by setting a password for your account. 
                You will still be able to sign in via Google.
              </p>
              
              <PasswordSetter authHeaders={authHeaders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordSetter({ authHeaders }: any) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSetPassword = async () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/user/profile/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setSuccess(true);
        setPassword('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New account password"
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      
      {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {error}</p>}
      {success && <p className="text-green-500 text-xs flex items-center gap-1"><CheckCircle size={12} /> Password updated successfully!</p>}

      <button
        type="button"
        onClick={handleSetPassword}
        disabled={loading || !password}
        className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : 'Update Password'}
      </button>
    </div>
  );
}

function ProfileInput({ label, icon, value, onChange, placeholder, disabled = false, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
        {icon} {label}
      </label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border border-slate-800 disabled:opacity-50 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all backdrop-blur-md"
      />
    </div>
  );
}
