import React from 'react';
import { twJoin } from 'tailwind-merge';
import {
  AuthHeader, LogoBlock, PageTitle, SignUpForm
} from '@/src/components';
import { setMeta } from '@/src/utils';

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
        <AuthHeader>회원가입</AuthHeader>

        <SignUpForm />
      </div>
    </>
  );
}
