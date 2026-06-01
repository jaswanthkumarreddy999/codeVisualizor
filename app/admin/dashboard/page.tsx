'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, User as UserIcon, Code, Calendar, MapPin, 
  ChevronRight, ArrowLeft, Loader2, Search, ExternalLink 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userPrograms, setUserPrograms] = useState<UserProgram[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!session || (session.user as any).role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, router]);

  const handleSelectUser = async (user: UserProfile) => {
    setSelectedUser(user);
    setLoadingPrograms(true);
    try {
      const res = await fetch(`/api/user/programs?userId=${user._id}`);
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

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <Loader2 className="text-indigo-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-[Outfit,sans-serif]">
      {/* Sidebar / User List */}
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-2">
            {filteredUsers.map(user => (
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
            ))}
          </div>
        </div>

        {/* User Details View */}
        <div className="flex-grow bg-[#0a0a0b] overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedUser ? (
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
                </div>

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
                            <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded-full uppercase text-gray-400">{prog.language}</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1">{prog.title}</h4>
                          <p className="text-xs text-gray-500 mb-6">Last updated {new Date(prog.updatedAt).toLocaleString()}</p>
                          <button 
                            onClick={() => router.push(`/visualizer?programId=${prog._id}`)}
                            className="w-full py-2 rounded-lg bg-white/5 hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-sm"
                          >
                            View in Editor <ExternalLink size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center mb-6">
                  <UserIcon size={32} />
                </div>
                <p className="text-lg">Select a user to view their profile and code</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
