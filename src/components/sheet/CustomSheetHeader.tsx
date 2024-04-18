'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { SheetDescription, SheetHeader, SheetTitle } from '@/src/shadcn';

interface Props {
  title: string;
  description: string;
  styles?: ClassNameValue;
}

export function CustomSheetHeader({ title, description, styles, }: Props) {
  const css = {
    default: twJoin([
      `mb-5`,
      styles,
    ]),
    title: twJoin([
      `!font-900 mb-2 !text-black-base !text-h4`,
    ]),
    description: twJoin([
      `!text-black-base !text-middle text-justify`,
    ]),
  };

  return (
    <>
      <SheetHeader className={css.default}>
        <SheetTitle className={css.title}>
          {title}
        </SheetTitle>
        <SheetDescription className={css.description}>
          {description}
        </SheetDescription>
      </SheetHeader>
    </>
  );
}
