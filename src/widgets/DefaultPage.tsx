import React from 'react';
import { twJoin } from 'tailwind-merge';
import { AppMain, FooterBlock, HeaderBlock } from '@/src/components';
import { blackhole } from '@/src/images';

interface Props {
  children: React.ReactNode;
}

export function DefaultPage({ children, }: Props) {
  const css = {
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0 z-[1] opacity-40`,
    ]),
  };
  return (
    <>
      <HeaderBlock styles='relative z-[2]' />

      <AppMain styles='relative z-[2]'>
        {children}
      </AppMain>

      <FooterBlock styles='relative z-[2]' />

      <div
        style={{
          backgroundImage: `url(${blackhole.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        className={css.image}
      />
    </>
  );
}
