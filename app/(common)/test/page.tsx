import React from 'react';
import { setMeta } from '@/src/utils';
import { TestCalendar } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '',
  url: '',
});

export default function TestPage() {
  return (
    <>
      <TestCalendar />
    </>
  );
}
