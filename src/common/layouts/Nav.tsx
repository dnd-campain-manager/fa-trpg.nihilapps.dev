'use client';

import React from 'react';
import Link from 'next/link';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  styles?: ClassNameValue
}

export function Nav({ styles, }: Props) {
  const style = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <nav className={style.default}>
        <div>
          <Link href='/'>홈</Link>
        </div>
      </nav>
    </>
  );
}
