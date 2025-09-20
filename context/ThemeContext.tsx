import React, { createContext, useState, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface Colors {
  primary: string;
  primaryLight: string;
  secondary: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textSecondary: string;
  inputBackground: string;
}

const lightColors: Colors = {
  primary: '#8B5CF6',
  primaryLight: '#F3F0FF',
  secondary: '#3B82F6',
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
  inputBackground: '#FFFFFF',
};

const darkColors: Colors = {
  primary: '#8B5CF6',
  primaryLight: '#2D1B69',
  secondary: '#3B82F6',
  success: '#10B981',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  error: '#EF4444',
  errorLight: '#7F1D1D',
  background: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  inputBackground: '#1E293B',
};

interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};