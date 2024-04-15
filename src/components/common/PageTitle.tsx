'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Card } from '@/src/shadcn';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function PageTitle({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      `mb-5 mt-10 bg-primary border-primary text-center !font-900 !text-h4 text-white py-2`,
      styles,
    ]),
  };

  return (
    <>
      <Card className={css.default}>
        <h2>{children}</h2>
      </Card>
    </>
  );
}
