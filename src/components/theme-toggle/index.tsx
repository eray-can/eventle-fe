'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="text-sm">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </Button>
  );
}
