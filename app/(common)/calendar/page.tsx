import React from 'react';
import { setMeta } from '@/src/utils';

interface Props {
  //
}

export const metadata = setMeta({
  title: '세션 일정',
  url: '/calendar',
});

export default function page() {
  return (
    <>
      <div>content</div>
    </>
  );
}
