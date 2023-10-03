import { useEffect, useState } from 'react';

export function useColorScheme() {
  const [isDark, setIsDark] = useState(() => {
    const colorScheme = localStorage.getItem('colorScheme');
    return colorScheme === null ? true : colorScheme === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.querySelector(':root').classList.add('dark');
      localStorage.setItem('colorScheme', 'dark');
    } else {
      document.querySelector(':root').classList.remove('dark');
      localStorage.setItem('colorScheme', '');
    }
  }, [isDark]);

  return {
    isDark,
    setIsDark,
  };
}
