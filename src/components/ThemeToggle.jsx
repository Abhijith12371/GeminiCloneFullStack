import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-5 w-5 transition-all ${
          resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        } text-gray-600`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${
          resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        } text-gray-400`}
      />
    </button>
  );
}
