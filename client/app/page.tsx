'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Github
} from 'lucide-react';
import Link from 'next/link';
import { HomeNavbar } from '@/components/HomeNavbar';
import { HomeFooter } from '@/components/HomeFooter';

export default function LandingPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <HomeNavbar />

      {/* High-Impact Hero Section */}
      <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-56 overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
        
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-indigo-400 text-xs font-black mb-10 uppercase tracking-[0.2em]"
          >
            <Zap size={14} className="fill-current" /> Next-Gen Debugging
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-white"
          >
            Visualize Code <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 animate-gradient-x">
              Live & Multi-Lang.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-3xl text-slate-400 mb-16 max-w-4xl mx-auto leading-relaxed font-semibold italic opacity-80"
          >
            The ultimate execution companion for algorithms. See every variable, pointer, and heap allocation in high-fidelity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link 
              href="/visualizer" 
              className="group px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-2xl transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(79,70,229,0.4)] flex items-center justify-center gap-4 border border-indigo-400/20"
            >
              Get Started <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="https://github.com" 
              className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-3xl rounded-[2rem] font-black text-2xl transition-all flex items-center justify-center gap-4 hover:border-white/20 active:scale-95"
            >
              <Github size={28} /> GitHub
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Product Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-32 px-4 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent blur-3xl opacity-30 animate-pulse" />
          <div className="relative group p-1.5 rounded-[3.5rem] bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(79,70,229,0.15)] overflow-hidden">
            <div className="rounded-[3.2rem] overflow-hidden border border-white/10 bg-slate-950 shadow-inner group-hover:scale-[1.005] transition-transform duration-1000">
              <img 
                src="/hero.png" 
                alt="Code Visualizer Interface" 
                className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
              />
            </div>
            
            {/* Absolute Badges */}
            <div className="absolute left-12 top-1/4 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl hidden xl:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Environment</div>
                  <div className="text-lg font-bold">100% Safe Execution</div>
                </div>
              </div>
            </div>

            <div className="absolute right-12 bottom-1/4 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl hidden xl:block animate-bounce-slow-delayed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Zap size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Performance</div>
                  <div className="text-lg font-bold">Real-time Tracing</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Transition Section */}
      <section className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 mb-12"
          >
            <div className="px-8 py-3 rounded-full bg-[#020617] text-xl font-bold">
              Trusted by users worldwide.
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-3xl font-black italic tracking-tighter">TypeScript</div>
            <div className="text-3xl font-black italic tracking-tighter">Python</div>
            <div className="text-3xl font-black italic tracking-tighter">Java</div>
            <div className="text-3xl font-black italic tracking-tighter">C/C++</div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
