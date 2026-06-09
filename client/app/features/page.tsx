'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  BookOpen, 
  Cpu, 
  Zap, 
  Terminal, 
  ShieldCheck,
  Search,
  Activity,
  Box
} from 'lucide-react';
import { HomeNavbar } from '@/components/HomeNavbar';
import { HomeFooter } from '@/components/HomeFooter';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <HomeNavbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter">
              Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Features</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Everything you need to master Data Structures and Algorithms with professional-grade visualization tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassFeatureCard 
              icon={<Search size={28} />}
              title="Full Introspection"
              description="Inspect every variable, pointer, and heap allocation in your code. See the exact state at every step."
            />
            <GlassFeatureCard 
              icon={<Layers size={28} />}
              title="State Snapshots"
              description="Navigate back and forth through time to see how your data structures evolve as your code executes."
            />
            <GlassFeatureCard 
              icon={<Cpu size={28} />}
              title="Memory Layouts"
              description="Visualizations for Arrays, Matrices, Linked Lists, Trees, and more, all rendered with 3D-inspired aesthetics."
            />
            <GlassFeatureCard 
              icon={<Terminal size={28} />}
              title="Multi-Language"
              description="Native support for TypeScript, Python, Java, C, and C++ with real-time execution tracing."
            />
            <GlassFeatureCard 
              icon={<ShieldCheck size={28} />}
              title="Secure Sandbox"
              description="Your code runs in isolated environments with strict resource limits and input/output handling."
            />
            <GlassFeatureCard 
              icon={<Activity size={28} />}
              title="Performance Metrics"
              description="Track execution time and step counts to optimize your algorithms for maximum efficiency."
            />
            <GlassFeatureCard 
              icon={<Box size={28} />}
              title="Integrated Sheets"
              description="Directly solve problems from NeetCode 150 and Striver A2Z sheets with pre-configured templates."
            />
            <GlassFeatureCard 
              icon={<BookOpen size={28} />}
              title="Step Explanations"
              description="Automatic descriptions for each execution step help you understand the 'why' behind the 'how'."
            />
            <GlassFeatureCard 
              icon={<Zap size={28} />}
              title="Instant Feedback"
              description="Changes in your code are reflected immediately in the visualizer for a seamless learning experience."
            />
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

function GlassFeatureCard({ icon, title, description }: any) {
  return (
    <motion.div 
      {...fadeInUp}
      whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
      className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-xl transition-all flex flex-col gap-8 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  );
}
