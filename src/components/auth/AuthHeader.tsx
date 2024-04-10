'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { LogoBlock } from '@/src/components';
import { Card, CardContent } from '@/src/shadcn';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function AuthHeader({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <header className={css.default}>
        <Card className='text-black-base mb-5'>
          <CardContent className='!p-2 !px-6 flex flex-row justify-between items-center'>
            <LogoBlock styles='w-[150px]' />
            <h2 className='font-900 text-[1.8rem] text-black-base leading-[0]'>{children}</h2>
          </CardContent>
        </Card>
      </header>
    </>
  );
}
