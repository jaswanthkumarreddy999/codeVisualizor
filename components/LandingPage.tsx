'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Layers, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  User, 
  Shield, 
  ArrowRight,
  Monitor
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-accent/30 selection:text-white font-[Outfit,sans-serif]">
      {/* Navbar (Landing) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layers size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            CodeVisualizor
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => signIn('google')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <Link
            href="/visualizer"
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10 flex items-center gap-2 group"
          >
            Launch App
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
              Visualizing the Invisible
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
              Master Code With <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Visual Execution.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience your code in a new dimension. Visualize data structures, memory allocation, 
              and program flow in real-time across multiple languages.
            </p>
          </motion.div>

          {/* Login Options / Roles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
          >
            {/* User Option */}
            <div 
              onClick={() => signIn('google')}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Student Access</h3>
              <p className="text-sm text-gray-400 mb-6">Sign in with Google to save projects, sync with cloud, and track progress.</p>
              <div className="text-indigo-400 font-semibold text-sm flex items-center gap-1">
                Start Learning <ArrowRight size={14} />
              </div>
            </div>

            {/* Guest Option */}
            <Link 
              href="/visualizer"
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guest Access</h3>
              <p className="text-sm text-gray-400 mb-6">Explore the visualizer instantly. Your work is saved locally in your browser.</p>
              <div className="text-purple-400 font-semibold text-sm flex items-center gap-1">
                Try Now <ArrowRight size={14} />
              </div>
            </Link>

            {/* Admin Option */}
            <div 
              onClick={() => signIn()}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group"
            >

              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Admin Portal</h3>
              <p className="text-sm text-gray-400 mb-6">Manage public folders, seeded programs, and system settings for all users.</p>
              <div className="text-pink-400 font-semibold text-sm flex items-center gap-1">
                Sign In <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121214]"
          >
            <div className="h-10 bg-[#1a1a1e] flex items-center px-4 gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 px-3 py-1 rounded bg-white/5 text-[10px] text-gray-500 font-mono">visualizer.tsx</div>
            </div>
            <div className="p-4 grid grid-cols-12 gap-4 h-[400px]">
              <div className="col-span-4 bg-indigo-500/5 rounded-lg border border-indigo-500/10 p-4 font-mono text-xs text-indigo-300 text-left overflow-hidden">
                <div className="mb-2 opacity-50"># Quick Preview</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">class</span> <span className="text-yellow-400">Main</span> {'{'}</div>
                  <div className="pl-4"><span className="text-purple-400">public static void</span> <span className="text-blue-400">main</span>(String[] args) {'{'}</div>
                  <div className="pl-8 text-white">int[] arr = {'{'}1, 2, 3{'}'};</div>
                  <div className="pl-8 text-blue-400 underline">System.out.println(arr[0]);</div>
                  <div className="pl-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="col-span-8 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center gap-4">
                  {/* Mock Visualizer Nodes */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-xl animate-pulse">1</div>
                  <div className="w-4 h-[2px] bg-indigo-500/50" />
                  <div className="w-20 h-20 rounded-xl border-2 border-indigo-500/50 flex items-center justify-center text-2xl font-bold opacity-60">2</div>
                  <div className="w-4 h-[2px] bg-indigo-500/20" />
                  <div className="w-20 h-20 rounded-xl border-2 border-indigo-500/20 flex items-center justify-center text-2xl font-bold opacity-30">3</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-8 bg-[#0d0d0e]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Code className="text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold mb-3">Multi-Language</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Full support for Java, Python, C, C++, and TypeScript with step-by-step execution.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="text-purple-400" />
              </div>
              <h4 className="text-lg font-bold mb-3">Real-time Feedback</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Instantly see object mapping, pointer relations, and memory state changes.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Monitor className="text-blue-400" />
              </div>
              <h4 className="text-lg font-bold mb-3">Interactive Workspace</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Draggable nodes, collapsible panes, and theme customization for focus.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                <Workflow className="text-green-400" />
              </div>
              <h4 className="text-lg font-bold mb-3">Cloud Sync</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Save your code and visualization layouts to your account automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 text-center">
        <p className="text-gray-600 text-sm italic mb-4">"Computational thinking is for everyone, everywhere."</p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
          Made with <span className="text-red-500">♥</span> for the Coding Community
        </div>
      </footer>
    </div>
  );
};
