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
    const imageDark = document.querySelectorAll('.image-theme--dark');
    const imageLight = document.querySelectorAll('.image-theme--light');

    const iterateImages = (imageSet, visibility) => {
      imageSet.forEach((item) => {
        item.style.display = visibility;
      });
    };

    if (isDark) {
      document.querySelector(':root').classList.add('dark');
      iterateImages(imageDark, 'block');
      iterateImages(imageLight, 'none');
      if (windowGlobal?.localStorage != null) {
        localStorage.setItem('colorScheme', 'dark');
      }
    } else {
      document.querySelector(':root').classList.remove('dark');
      iterateImages(imageDark, 'none');
      iterateImages(imageLight, 'block');
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
