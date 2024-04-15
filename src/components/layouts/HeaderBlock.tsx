'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  LogoBlock, NavBlock, UserNav
} from '@/src/components';
import { Card, CardContent } from '@/src/shadcn';

interface Props {
  styles?: ClassNameValue;
}

export function HeaderBlock({ styles, }: Props) {
  const css = {
    default: twJoin([
      `pt-5 w-full mo-md:max-w-[940px] mx-auto px-5`,
      styles,
    ]),
  };

  return (
    <header className={css.default}>
      <UserNav />

      <Card className='w-full mo-md:max-w-[900px] mx-auto'>
        <CardContent className='!p-2 flex flex-col items-center'>
          <LogoBlock />

          <div>
            <NavBlock />
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
