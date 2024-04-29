'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { InfoName } from '@/src/components';

interface Props {
  name: string;
  children: React.ReactNode;
  pre?: boolean;
  styles?: ClassNameValue;
}

export function InfoItem({
  name, children, pre, styles,
}: Props) {
  const css = {
    default: twJoin([
      `flex flex-row items-stretch [&>p]:flex [&>p]:flex-row [&>p]:items-center`,
      styles,
    ]),
    pre: twJoin([
      `font-sans text-justify whitespace-pre-wrap flex flex-row items-center py-1`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <InfoName>{name}</InfoName>
        {pre ? (
          <pre className={css.pre}>{children}</pre>
        ) : (
          <p>{children}</p>
        )}
      </div>
    </>
  );
}
