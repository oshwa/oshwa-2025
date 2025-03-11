import React from 'react';
import Toggle from 'react-toggle';
import { useColorScheme } from '../helpers/useColorScheme';
import LightModeIcon from './LightModeIcon';
import DarkModeIcon from './DarkModeIcon';
import 'react-toggle/style.css';

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <>
      // <LightModeIcon />
      <Toggle
        id="mode"
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: '', unchecked: '' }}
        aria-label="Dark mode toggle"
      />
      // <DarkModeIcon />
    </>
  );
};
//
