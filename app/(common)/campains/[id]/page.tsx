import React from 'react';
import { setMeta } from '@/src/utils';
import { CampainsQuery } from '@/src/features';
import { CampainDetail } from '@/src/components';

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
  const { data, } = await CampainsQuery.getById(params.id);

  return setMeta({
    title: `캠페인: ${data.name}`,
    url: `/campains/${data.id}`,
  });
}

export default function CampainDetailPage({ params, }: Props) {
  return (
    <CampainDetail campainId={params.id} />
  );
}
