'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { cn } from '@/src/utils/shacdnUtils';

interface Props {
  color?: ('red' | 'blue' | 'orange' | 'green');
  className?: string;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function Message({
  color, className, children, styles,
}: Props) {
  const css = {
    default: twJoin([
      `italic font-700 text-black-base inline-block text-small !mt-1`,
      styles,
    ]),
  };

  const messageVariants = cva(
    css.default,
    {
      variants: {
        color: {
          red: `text-red-500`,
          blue: `text-blue-500`,
          orange: `text-orange-600`,
          green: `text-green-600`,
        },
      },
      defaultVariants: {
        color: 'blue',
      },
    }
  );

  return (
    <>
      <span className={cn(messageVariants({ color, className, }))}>
        {children}
      </span>
    </>
  );
}
