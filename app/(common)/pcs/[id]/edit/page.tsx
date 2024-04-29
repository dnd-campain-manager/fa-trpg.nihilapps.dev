import React from 'react';
import { setMeta } from '@/src/utils';
import { PcsQuery } from '@/src/features';
import { PcUpdate } from '@/src/components';

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
    title: `${pc.name} 수정`,
    url: `/pcs/${pc.id}/edit`,
  });
}

export default function PcUpdatePage({ params, }: Props) {
  return (
    <PcUpdate pcId={params.id} />
  );
}
