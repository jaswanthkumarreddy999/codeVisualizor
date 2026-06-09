'use client';

import React from 'react';
import { X, Moon, Sun, Monitor, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeMode, AccentColor } from '@/hooks/useTheme';

interface SettingsModalProps {
  themeMode: ThemeMode;
  accentColor: AccentColor;
  onThemeModeChange: (mode: ThemeMode) => void;
  onAccentColorChange: (color: AccentColor) => void;
  onClose: () => void;
}

const ACCENT_COLORS = [
  { id: 'blue', hex: '#3b82f6', label: 'Blue' },
  { id: 'purple', hex: '#a855f7', label: 'Purple' },
  { id: 'green', hex: '#22c55e', label: 'Green' },
  { id: 'orange', hex: '#f97316', label: 'Orange' },
] as const;

export const SettingsModal: React.FC<SettingsModalProps> = ({
  themeMode,
  accentColor,
  onThemeModeChange,
  onAccentColorChange,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pointer-events-none">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95, x: 20 }}
        className="mt-14 w-85 bg-[#0a0a0b]/80 border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 backdrop-blur-3xl pointer-events-auto relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Appearance</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Interface Settings</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all active:scale-95 text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8 relative">
          {/* Theme Mode Section */}
          <section>
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 block px-1">Theme Mode</label>
            <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {[
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'codenow', icon: Monitor, label: 'CodeNow' }
              ].map(({ id, icon: Icon, label }) => {
                const isActive = themeMode === id;
                return (
                  <button
                    key={id}
                    onClick={() => onThemeModeChange(id as ThemeMode)}
                    className={`relative py-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-2 z-10 ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTheme"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)] -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="tracking-wide">{label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Accent Color Section */}
          <section>
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 block px-1">Accent Color</label>
            <div className={`grid grid-cols-4 gap-4 ${themeMode === 'codenow' ? 'opacity-20 pointer-events-none filter blur-[1px]' : ''}`}>
              {ACCENT_COLORS.map((color) => {
                const isActive = accentColor === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => onAccentColorChange(color.id as AccentColor)}
                    className="group relative flex flex-col items-center gap-2"
                  >
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                        isActive 
                          ? 'scale-110 shadow-lg' 
                          : 'hover:scale-105 opacity-60 hover:opacity-100'
                      }`}
                      style={{ 
                        backgroundColor: color.hex + '15', // Low alpha background
                        border: `2px solid ${isActive ? color.hex : 'transparent'}`,
                        boxShadow: isActive ? `0 0 20px ${color.hex}40` : 'none'
                      }}
                    >
                      <div 
                        className="w-5 h-5 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      {isActive && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check size={12} className="text-black font-black" strokeWidth={4} />
                        </motion.div>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/20'}`}>
                      {color.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {themeMode === 'codenow' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5"
              >
                <p className="text-[10px] text-white/40 leading-relaxed text-center font-medium italic">
                  The <span className="text-[#22c55e] font-bold italic not-italic font-mono">CodeNow</span> theme uses its own curated color palette automatically.
                </p>
              </motion.div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
};
