import React from 'react';
import { twJoin } from 'tailwind-merge';
import { blackhole } from '@/src/images';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: Props) {
  const css = {
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0 z-1 opacity-40`,
    ]),
  };

  return (
    <main className='w-full p-5 mo-md:max-w-[900px] mx-auto'>
      {children}

      <div
        style={{
          backgroundImage: `url(${blackhole.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        className={css.image}
      />
    </main>
  );
}
