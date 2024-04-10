import React from 'react';
import { setMeta } from '@/src/utils';

interface Props {
  //
}

export const metadata = setMeta({
  title: '비밀번호 변경',
  url: '/auth/password-reset',
});

export default function page() {
  return (
    <>
      <div>content</div>
    </>
  );
}
