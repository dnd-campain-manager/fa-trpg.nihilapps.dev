'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  level: ('h2' | 'h3' | 'h4' | 'h5' | 'h6');
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function HeadingItem({ level: Level, children, styles, }: Props) {
  const css = {
    default: twJoin([
      `font-900`,
      Level === 'h2' && `text-h2`,
      Level === 'h3' && `text-h3`,
      Level === 'h4' && `text-h4`,
      Level === 'h5' && `text-h5`,
      Level === 'h6' && `text-h6`,
      styles,
    ]),
  };

  return (
    <>
      <Level className={css.default}>{children}</Level>
    </>
  );
}
