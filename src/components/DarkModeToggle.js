import React, { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.querySelector(':root').classList.add('dark');
    } else {
      document.querySelector(':root').classList.remove('dark');
    }
  }, [isDark]);
  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: '', unchecked: '' }}
      aria-label="Dark mode toggle"
    />
  );
};
