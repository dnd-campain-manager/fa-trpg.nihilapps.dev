'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { commonStore, setDarkMode } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

export function ToggleDarkMode({ styles, }: Props) {
  const { darkMode, } = commonStore();

  const onToggleDark = useCallback(
    () => {
      // eslint-disable-next-line no-unused-expressions
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    },
    []
  );

  const onToggleLight = useCallback(
    () => {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    dark: twJoin([
      `p-2 rounded-1 border border-black-500`,
    ]),
    light: twJoin([
      `p-2 rounded-1 border border-black-200`,
    ]),
    icon: twJoin([
      `text-blue-500 dark:text-yellow-500 text-2xl`,
    ]),
  };

  return (
    <>
      {darkMode ? (
        <button
          aria-label='toggle-light-mode'
          onClick={onToggleLight}
          className={css.dark}
        >
          <Icon icon='radix-icons:moon' className={css.icon} />
        </button>
      ) : (
        <button
          aria-label='toggle-dark-mode'
          onClick={onToggleDark}
          className={css.light}
        >
          <Icon icon='radix-icons:sun' className={css.icon} />
        </button>
      )}
    </>
  );
}
