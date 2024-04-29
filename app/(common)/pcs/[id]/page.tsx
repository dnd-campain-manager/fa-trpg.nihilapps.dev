import React from 'react';
import { setMeta } from '@/src/utils';
import { PcsQuery } from '@/src/features';
import { PcDetail } from '@/src/components';

interface Props {
  params: {
    id: string;
  };
}

interface Params {
  params: {
    id: string;
  }
}

export async function generateMetadata({ params, }: Params) {
  const { data: pc, } = await PcsQuery.getById(params.id);

  return setMeta({
    title: `PC: ${pc.name} 상세 정보`,
    url: `/pcs/${pc.id}`,
  });
}

export default function PcDetailPage({ params, }: Props) {
  console.log('pcId >> ', params.id);
  return (
    <PcDetail pcId={params.id} />
  );
}
