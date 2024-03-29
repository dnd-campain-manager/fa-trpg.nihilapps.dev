'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Logo, Nav } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

export function Header({ styles, }: Props) {
  const style = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <header className={style.default}>
      <Logo />

      <div>
        <Nav />
      </div>
    </header>
  );
}
