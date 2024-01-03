import { useEffect, useState } from 'react';
const windowGlobal = typeof window !== 'undefined' && window;

export function useColorScheme() {
  const [isDark, setIsDark] = useState(() => {
    const colorScheme =
      windowGlobal?.localStorage == null
        ? null
        : windowGlobal.localStorage.getItem('colorScheme');
    return colorScheme === null ? true : colorScheme === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.querySelector(':root').classList.add('dark');
      if (windowGlobal?.localStorage != null) {
        localStorage.setItem('colorScheme', 'dark');
      }
    } else {
      document.querySelector(':root').classList.remove('dark');
      if (windowGlobal?.localStorage != null) {
        localStorage.setItem('colorScheme', '');
      }
    }
  }, [isDark]);

  return {
    isDark,
    setIsDark,
  };
}
