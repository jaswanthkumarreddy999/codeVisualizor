import { useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'codenow';
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange';

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
    const savedAccent = localStorage.getItem('accent-color') as AccentColor;
    if (savedTheme) setThemeMode(savedTheme);
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-codenow');
    root.classList.add(`theme-${themeMode}`);
    
    root.classList.remove('accent-blue', 'accent-purple', 'accent-green', 'accent-orange');
    root.classList.add(`accent-${accentColor}`);

    localStorage.setItem('theme-mode', themeMode);
    localStorage.setItem('accent-color', accentColor);
  }, [themeMode, accentColor]);

  return {
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    isSettingsOpen,
    setIsSettingsOpen
  };
} 
