import React from 'react';
import { setMeta } from '@/src/utils';

interface Props {
  //
}

export const metadata = setMeta({
  title: '마이페이지',
  url: '/mypage',
});

export default function MyPage() {
  return (
    <>
      <div>content</div>
    </>
  );
}
