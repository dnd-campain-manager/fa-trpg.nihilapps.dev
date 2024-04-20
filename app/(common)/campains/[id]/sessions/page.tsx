import React from 'react';
import { setMeta } from '@/src/utils';
import { CampainsQuery } from '@/src/features';
import { CampainSessionList } from '@/src/components';

interface Props {
  params: {
    id: string;
  };
}

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params, }: Params) {
  const { data: campain, } = await CampainsQuery.getById(params.id);

  return setMeta({
    title: `캠페인: ${campain.name}`,
    url: `/campains/${campain.id}/sessions`,
  });
}

export default async function SessionListPage({ params, }: Props) {
  return (
    <CampainSessionList campainId={params.id} />
  );
}
