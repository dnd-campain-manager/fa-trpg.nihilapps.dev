import React from 'react';
import { setMeta } from '@/src/utils';
import { CampainList } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '캠페인 리스트',
  url: '/campains',
});

export default function CampainListPage() {
  return (
    <>
      <CampainList />
    </>
  );
}
