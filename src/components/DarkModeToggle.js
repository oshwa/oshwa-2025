import React from 'react';
import Toggle from 'react-toggle';
import { useColorScheme } from '../helpers/useColorScheme';
import 'react-toggle/style.css';

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: '', unchecked: '' }}
      aria-label="Dark mode toggle"
    />
  );
};
// 