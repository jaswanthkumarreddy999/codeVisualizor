'use client';

import React from 'react';
import Link from 'next/link';

export function HomeFooter() {
  return (
    <footer className="py-20 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-8 mb-12">
          <FooterLink href="#">Documentation</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </div>
        <p className="text-slate-600 text-sm font-medium">Built for the next generation of Master Engineers. © 2026 CodeVisualizer.</p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-slate-500 hover:text-indigo-400 transition-colors font-bold text-sm">
      {children}
    </Link>
  );
}
