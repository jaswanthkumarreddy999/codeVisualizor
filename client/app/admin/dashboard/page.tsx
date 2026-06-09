'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, User as UserIcon, Code, Calendar,
  ChevronRight, ArrowLeft, Loader2, Search, ExternalLink, Trash2,
  MessageSquare, Clock 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  age?: number;
  institution?: string;
  major?: string;
  bio?: string;
  createdAt: string;
  isProfileComplete: boolean;
}

interface UserProgram {
  _id: string;
  title: string;
  language: string;
  updatedAt: string;
}

interface Suggestion {
  id: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, isAdmin, authHeaders } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'users' | 'suggestions'>('users');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userPrograms, setUserPrograms] = useState<UserProgram[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [search, setSearch] = useState('');

  // Editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    age: '',
    institution: '',
    major: '',
    bio: ''
  });

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) {
      router.push('/visualizer');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, suggestionsRes] = await Promise.all([
          fetch('/api/admin/users', { headers: authHeaders() }),
          fetch('/api/suggestions', { headers: authHeaders() })
        ]);

        if (usersRes.ok) setUsers(await usersRes.json());
        if (suggestionsRes.ok) setSuggestions(await suggestionsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, isAdmin, router]);

  const handleSelectUser = async (selectedProfile: UserProfile) => {
    setSelectedUser(selectedProfile);
    setIsEditingProfile(false);
    setEditFormData({
      name: selectedProfile.name || '',
      age: selectedProfile.age?.toString() || '',
      institution: selectedProfile.institution || '',
      major: selectedProfile.major || '',
      bio: selectedProfile.bio || ''
    });
    
    setLoadingPrograms(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedProfile._id}/programs`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setUserPrograms(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrograms(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedUser(updated);
        setUsers(users.map(u => u._id === updated._id ? updated : u));
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      const res = await fetch(`/api/admin/programs/${programId}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        setUserPrograms(userPrograms.filter(p => p._id !== programId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <Loader2 className="text-indigo-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-[Outfit,sans-serif]">
      {/* Sidebar / List */}
      <div className="flex h-screen overflow-hidden">
        <div className="w-96 border-r border-white/10 bg-white/[0.02] flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link 
              href="/visualizer" 
              className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors mb-6 text-sm font-bold group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Project Visualizer
            </Link>
            <h1 className="text-2xl font-black flex items-center gap-3 mb-6">
              <Users className="text-indigo-500" size={28} /> Admin Console
            </h1>
            
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'users' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white'}`}
              >
                Users
              </button>
              <button 
                onClick={() => setActiveTab('suggestions')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'suggestions' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white'}`}
              >
                Suggestions
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text"
                placeholder={activeTab === 'users' ? "Search users..." : "Search suggestions..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-2">
            {activeTab === 'users' ? (
              filteredUsers.map(user => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full text-left p-4 rounded-xl transition-all mb-1 flex items-center gap-4 ${selectedUser?._id === user._id ? 'bg-indigo-500/20 border border-indigo-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                    {user.name[0]}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="font-bold truncate">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                  <ChevronRight size={16} className={selectedUser?._id === user._id ? 'text-indigo-400' : 'text-gray-600'} />
                </button>
              ))
            ) : (
              suggestions.filter(s => s.message.toLowerCase().includes(search.toLowerCase())).map(s => (
                <div key={s.id} className="w-full p-4 rounded-xl border border-white/10 bg-white/[0.01] mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-[10px] font-bold">
                      {s.userName?.[0] || 'G'}
                    </div>
                    <span className="text-xs font-bold truncate">{s.userName || 'Guest User'}</span>
                    <span className="text-[10px] text-gray-500 ml-auto flex items-center gap-1">
                      <Clock size={10} /> {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{s.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Details View */}
        <div className="flex-grow bg-[#0a0a0b] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'users' && selectedUser ? (
              <motion.div 
                key={selectedUser._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-12 max-w-5xl mx-auto"
              >
                <div className="flex items-start justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40">
                      {selectedUser.name[0]}
                    </div>
                    <div>
                      <h2 className="text-4xl font-black mb-2">{selectedUser.name}</h2>
                      <p className="text-xl text-gray-400">{selectedUser.email}</p>
                      <div className="flex gap-3 mt-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">{selectedUser.role}</span>
                        {!selectedUser.isProfileComplete && (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">Incomplete Profile</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
                  >
                    {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleUpdateProfile} className="bg-white/[0.02] border border-indigo-500/30 rounded-2xl p-8 mb-12 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                        <input 
                          value={editFormData.name} 
                          onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
                        <input 
                          type="number"
                          value={editFormData.age} 
                          onChange={e => setEditFormData({...editFormData, age: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Institution</label>
                        <input 
                          value={editFormData.institution} 
                          onChange={e => setEditFormData({...editFormData, institution: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Major</label>
                        <input 
                          value={editFormData.major} 
                          onChange={e => setEditFormData({...editFormData, major: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
                      <textarea 
                        value={editFormData.bio} 
                        onChange={e => setEditFormData({...editFormData, bio: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24 focus:border-indigo-500 outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={updating}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                      {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-400 uppercase tracking-widest text-xs">
                        <UserIcon size={14} /> Profile Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Age</span>
                          <span>{selectedUser.age || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Institution</span>
                          <span>{selectedUser.institution || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Major</span>
                          <span>{selectedUser.major || '—'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-400 uppercase tracking-widest text-xs">
                        <Calendar size={14} /> Account Activity
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Joined</span>
                          <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <Code className="text-indigo-500" /> Personal Programs
                  </h3>
                  
                  {loadingPrograms ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="animate-spin text-gray-600" />
                    </div>
                  ) : userPrograms.length === 0 ? (
                    <div className="text-center p-12 bg-white/[0.02] rounded-2xl border border-dashed border-white/10 text-gray-500">
                      This user has no programs yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userPrograms.map(prog => (
                        <div key={prog._id} className="bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 p-6 rounded-2xl transition-all group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                              <Code size={20} />
                            </div>
                            <div className="flex gap-2">
                                <button 
                                  onClick={() => handleDeleteProgram(prog._id)}
                                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                  title="Delete Program"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded-full uppercase text-gray-400">{prog.language}</span>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold mb-1">{prog.title}</h4>
                          <p className="text-xs text-gray-500 mb-6">Last updated {new Date(prog.updatedAt).toLocaleString()}</p>
                          <button 
                            onClick={() => router.push(`/visualizer?programId=${prog._id}`)}
                            className="w-full py-2 rounded-lg bg-white/5 hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-sm"
                          >
                            View & Edit <ExternalLink size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'suggestions' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 max-w-5xl mx-auto"
              >
                <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                  <MessageSquare className="text-indigo-500" size={40} /> 
                  User Feedback
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {suggestions.length === 0 ? (
                    <div className="text-center py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                      <p className="text-gray-500">No suggestions received yet.</p>
                    </div>
                  ) : (
                    suggestions.map(s => (
                      <motion.div 
                        key={s.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-indigo-500/50 transition-all shadow-xl"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xl">
                              {s.userName?.[0] || 'G'}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{s.userName || 'Guest User'}</h4>
                              <p className="text-xs text-gray-500">{s.userEmail || 'No email provided'}</p>
                            </div>
                          </div>
                          <span className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock size={12} /> {new Date(s.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                          <p className="text-gray-300 leading-relaxed italic">"{s.message}"</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center mb-6">
                  <UserIcon size={32} />
                </div>
                <p className="text-lg">Select a user or switch to suggestions tab</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
