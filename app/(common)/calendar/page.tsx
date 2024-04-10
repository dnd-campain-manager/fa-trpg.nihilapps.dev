import React from 'react';
import { setMeta } from '@/src/utils';
import { SessionCalendar } from '@/src/components';

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
      <SessionCalendar />
    </>
  );
}
