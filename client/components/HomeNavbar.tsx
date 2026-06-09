'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ChevronRight, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { AuthButton } from '@/components/AuthButton';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

export function HomeNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Code2 size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Code<span className="text-indigo-400">Visualizer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/features" active={pathname === '/features'}>Features</NavLink>
            <NavLink href="/how-to-use" active={pathname === '/how-to-use'}>How to Use</NavLink>
            <NavLink href="/languages" active={pathname === '/languages'}>Languages</NavLink>
            {user && (
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <UserCircle size={18} /> My Profile
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <AuthButton />
            <Link 
              href="/visualizer" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center gap-2"
            >
              Launch Tool <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
        active ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}
