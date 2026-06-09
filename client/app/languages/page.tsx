'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Binary, 
  Terminal, 
  Braces,
  Cpu
} from 'lucide-react';
import { HomeNavbar } from '@/components/HomeNavbar';
import { HomeFooter } from '@/components/HomeFooter';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function LanguagesPage() {
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
              Supported <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Languages</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              We support a wide range of popular programming languages with high-fidelity execution tracing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LanguageCard 
              name="TypeScript"
              icon={<Braces className="text-blue-400" />}
              level="Full Support"
              description="Client-side execution with Babel AST instrumentation. Lightning fast and highly interactive."
            />
            <LanguageCard 
              name="Python"
              icon={<Terminal className="text-yellow-400" />}
              level="Full Support"
              description="Server-side tracing using sys.settrace. Supports complex data structures and built-in types."
            />
            <LanguageCard 
              name="Java"
              icon={<Code2 className="text-red-400" />}
              level="Full Support"
              description="Enterprise-grade tracing via Java Debug Interface (JDI). Perfect for understanding JVM internals."
            />
            <LanguageCard 
              name="C"
              icon={<Binary className="text-gray-400" />}
              level="Primitives Only"
              description="Traced via GDB MI. Detailed view of primitive variables and control flow."
            />
            <LanguageCard 
              name="C++"
              icon={<Cpu className="text-blue-600" />}
              level="Primitives Only"
              description="Leverages GDB machine interface for low-level execution tracing and memory inspection."
            />
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

function LanguageCard({ name, icon, level, description }: any) {
  return (
    <motion.div 
      {...fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-xl flex flex-col gap-8"
    >
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
          {level}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  );
}
