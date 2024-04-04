import React from 'react';
import { twJoin } from 'tailwind-merge';
import { Logo, PageTitle, setMeta } from '@/src/common';
import { blackhole } from '@/src/images';
import { SignInForm } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '로그인',
  url: '/auth/signin',
});

export default function SignInPage() {
  const css = {
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0 z-1 opacity-40`,
    ]),
  };

  return (
    <>
      <div className='relative z-[2]'>
        <Logo />
        <PageTitle>로그인</PageTitle>

        <SignInForm />
      </div>

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
