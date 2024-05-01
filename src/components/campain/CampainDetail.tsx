'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { CampainDetailContent, CampainDetailHeader, LoadingCircle } from '@/src/components';
import { useGetCampainById } from '@/src/hooks';

interface Props {
  campainId: string;
  styles?: ClassNameValue;
}

export function CampainDetail({ campainId, styles, }: Props) {
  const campain = useGetCampainById(campainId);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (campain.isLoading || campain.isFetching) {
    return <LoadingCircle />;
  }

  return (
    campain.isSuccess && (
      <>
        <CampainDetailHeader campain={campain?.data.data} />
        <CampainDetailContent campain={campain?.data.data} />
      </>
    )
  );
}
