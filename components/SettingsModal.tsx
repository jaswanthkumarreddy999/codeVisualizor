'use client';

import React from 'react';
import { X, Moon, Sun, Monitor } from 'lucide-react';
import { ThemeMode, AccentColor } from '@/hooks/useTheme';

interface SettingsModalProps {
  themeMode: ThemeMode;
  accentColor: AccentColor;
  onThemeModeChange: (mode: ThemeMode) => void;
  onAccentColorChange: (color: AccentColor) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  themeMode,
  accentColor,
  onThemeModeChange,
  onAccentColorChange,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="mt-14 w-80 bg-theme-secondary border border-theme rounded-2xl shadow-2xl p-6 animate-in slide-in-from-top-4 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-theme-primary">Appearance</h3>
          <button onClick={onClose} className="p-1 hover:bg-theme-tertiary rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-2 block">Theme Mode</label>
            <div className="grid grid-cols-3 gap-2 bg-theme-tertiary p-1 rounded-xl">
              {[
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'codenow', icon: Monitor, label: 'CodeNow' }
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => onThemeModeChange(id as ThemeMode)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    themeMode === id 
                      ? 'bg-theme-secondary text-accent shadow-sm border border-theme' 
                      : 'text-theme-secondary hover:text-theme-primary'
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-2 block">Accent Color</label>
            <div className={`grid grid-cols-4 gap-3 ${themeMode === 'codenow' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              {(['blue', 'purple', 'green', 'orange'] as AccentColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => onAccentColorChange(color)}
                  className={`h-10 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center ${
                    accentColor === color 
                      ? 'border-accent scale-105 shadow-lg shadow-accent/20' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:bg-theme-tertiary'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-accent`} style={{ 
                    backgroundColor: `var(--accent-primary)`
                  }} />
                </button>
              ))}
            </div>
            {themeMode === 'codenow' && (
              <p className="text-[10px] text-theme-secondary mt-2 italic text-center">
                Accent colors are managed automatically in CodeNow theme.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
