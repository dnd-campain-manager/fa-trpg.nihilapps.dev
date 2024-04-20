import React from 'react';
import { setMeta } from '@/src/utils';
import { MyPage } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '마이페이지',
  url: '/mypage',
});

export default function UserMyPage() {
  return (
    <MyPage />
  );
}
