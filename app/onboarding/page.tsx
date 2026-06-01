'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, School, BookOpen, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    age: '',
    institution: '',
    major: '',
    bio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Update the session to reflect profile is complete
        await update({ isProfileComplete: true });
        router.push('/visualizer');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-6 font-[Outfit,sans-serif]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white/[0.03] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <User className="text-indigo-400" size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Complete Your Profile</h1>
          <p className="text-gray-400 text-sm">Tell us a bit about yourself to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">Full Name</label>
              <div className="relative group">
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">Age</label>
              <input 
                required
                type="number" 
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all"
                placeholder="21"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1 flex items-center gap-2">
              <School size={12} /> Institution
            </label>
            <input 
              required
              type="text" 
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all"
              placeholder="e.g. Stanford University"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1 flex items-center gap-2">
              <BookOpen size={12} /> Field of Study
            </label>
            <input 
              required
              type="text" 
              value={formData.major}
              onChange={(e) => setFormData({...formData, major: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all"
              placeholder="e.g. Computer Science"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">Short Bio</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all resize-none"
              placeholder="Tell us about your coding journey..."
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
              loading 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-indigo-500/20'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Let's Go <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
