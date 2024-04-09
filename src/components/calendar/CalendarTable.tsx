'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function CalendarTable({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <table className={css.default}>{children}</table>
    </>
  );
}
