'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';

interface Props {
  styles?: ClassNameValue;
}

export function Logo({ styles, }: Props) {
  // const { darkMode, } = commonStore();

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    image: twJoin([
      `h-[35px] w-auto`,
    ]),
  };

  return (
    <>
      <h1 className={css.default}>
        <Link href='/' as='/'>
          Logo
          {/*{darkMode ? (*/}
          {/*  <Image*/}
          {/*    src={logoWhite.src}*/}
          {/*    alt='logo'*/}
          {/*    width={logoWhite.width}*/}
          {/*    height={logoWhite.height}*/}
          {/*    priority*/}
          {/*    className={css.image}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <Image*/}
          {/*    src={logo.src}*/}
          {/*    alt='logo'*/}
          {/*    width={logo.width}*/}
          {/*    height={logo.height}*/}
          {/*    priority*/}
          {/*    className={css.image}*/}
          {/*  />*/}
          {/*)}*/}
        </Link>
      </h1>
    </>
  );
}
