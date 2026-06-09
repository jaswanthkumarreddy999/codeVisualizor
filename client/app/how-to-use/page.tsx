'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  MousePointer2, 
  FastForward,
  Save,
  Share2
} from 'lucide-react';
import { HomeNavbar } from '@/components/HomeNavbar';
import { HomeFooter } from '@/components/HomeFooter';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function HowToUsePage() {
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
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CodeVisualizer</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Start visualizing your code in three simple steps. Whether you're a student or a pro, we've got you covered.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 mb-32">
            <GuideStep 
              num="01"
              icon={<Terminal size={32} />}
              title="Input Your Code"
              description="Open the visualizer and paste your code or choose from our extensive problem library."
            />
            <GuideStep 
              num="02"
              icon={<Play size={32} />}
              title="Initiate Tracing"
              description="Hit 'Run Code' and wait for our backend to generate the execution data stream."
            />
            <GuideStep 
              num="03"
              icon={<MousePointer2 size={32} />}
              title="Explore the State"
              description="Use the timeline and canvas to interactively inspect your data structures."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <DetailCard 
              icon={<FastForward size={24} className="text-indigo-400" />}
              title="Control Time"
              description="Scrub through the execution timeline, play at various speeds, or step manually through every single line."
            />
            <DetailCard 
              icon={<Save size={24} className="text-cyan-400" />}
              title="Save Your Progress"
              description="Your projects are automatically saved locally. Sign in to sync them across all your devices."
            />
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

function GuideStep({ num, icon, title, description }: any) {
  return (
    <motion.div 
      {...fadeInUp}
      className="relative p-12 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-xl group hover:bg-white/[0.08] transition-all"
    >
      <div className="text-9xl font-black text-white/5 absolute top-4 right-8 select-none group-hover:text-indigo-500/10 transition-colors uppercase italic">{num}</div>
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 mb-8">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-6">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-lg font-medium">{description}</p>
    </motion.div>
  );
}

function DetailCard({ icon, title, description }: any) {
  return (
    <motion.div 
      {...fadeInUp}
      className="p-10 rounded-3xl bg-slate-900/40 border border-white/5 flex gap-8"
    >
      <div className="shrink-0">{icon}</div>
      <div>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  );
}
