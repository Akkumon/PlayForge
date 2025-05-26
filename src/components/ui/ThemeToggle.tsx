import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        shadow-sm hover:shadow-md transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
        dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-5 h-5"
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-gray-700 dark:text-purple-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
} 