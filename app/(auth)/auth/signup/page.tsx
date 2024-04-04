import React from 'react';
import { twJoin } from 'tailwind-merge';
import { Logo, PageTitle, setMeta } from '@/src/common';
import { SignUpForm } from '@/src/components';
import { blackhole } from '@/src/images';

interface Props {
  //
}

export const metadata = setMeta({
  title: '회원가입',
  url: '/auth/signup',
});

export default function SignUpPage() {
  const css = {
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0 z-1 opacity-40`,
    ]),
  };

  return (
    <>
      <div className='relative z-[2]'>
        <Logo />
        <PageTitle>회원가입</PageTitle>

        <SignUpForm />
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
