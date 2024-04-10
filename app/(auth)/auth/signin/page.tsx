import React from 'react';
import { twJoin } from 'tailwind-merge';
import {
  AuthHeader, SignInForm
} from '@/src/components';
import { setMeta } from '@/src/utils';

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
        <AuthHeader>로그인</AuthHeader>

        <SignInForm />
      </div>
    </>
  );
}
