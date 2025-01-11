import React from 'react';
import Toggle from 'react-toggle';
import { useColorScheme } from '../helpers/useColorScheme';
import 'react-toggle/style.css';
import LightModeIcon from '../images/icons/light_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import DarkModeIcon from '../images/icons/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <>
      <LightModeIcon />
      <Toggle
        id="mode"
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: '', unchecked: '' }}
        aria-label="Dark mode toggle"
      />
      <DarkModeIcon />
    </>
  );
};
//
