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
  const {
    data: campain,
    isLoading,
    isFetching,
  } = useGetCampainById(campainId);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return <LoadingCircle />;
  }

  return (
    <>
      <CampainDetailHeader campain={campain?.data} />
      <CampainDetailContent campain={campain?.data} />
    </>
  );
}
