'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import { commonStore } from '@/src/common';
import { logo, logoWhite } from '@/src/images';

interface Props {
  styles?: ClassNameValue;
}

export function Logo({ styles, }: Props) {
  const { darkMode, } = commonStore();

  const css = {
    default: twJoin([
      `text-center`,
      styles,
    ]),
    image: twJoin([
      `w-[200px] h-auto`,
    ]),
  };

  return (
    <>
      <h1 className={css.default}>
        <Link href='/' as='/' className='inline-block'>
          {darkMode ? (
            <Image
              src={logoWhite.src}
              alt='logo'
              width={logoWhite.width}
              height={logoWhite.height}
              priority
              className={css.image}
            />
          ) : (
            <Image
              src={logo.src}
              alt='logo'
              width={logo.width}
              height={logo.height}
              priority
              className={css.image}
            />
          )}
        </Link>
      </h1>
    </>
  );
}
