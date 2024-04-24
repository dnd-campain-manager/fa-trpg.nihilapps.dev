import React from 'react';
import { setMeta } from '@/src/utils';
import { PcList } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: 'PC 목록',
  url: '/pcs',
});

export default function PcListPage() {
  return (
    <>
      <PcList />
    </>
  );
}
