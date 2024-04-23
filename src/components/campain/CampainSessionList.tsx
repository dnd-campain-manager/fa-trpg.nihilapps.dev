'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useGetCampainById } from '@/src/hooks';
import { CampainDetailHeader, LoadingCircle, PageTitle } from '@/src/components';

interface Props {
  campainId: string;
  styles?: ClassNameValue;
}

export function CampainSessionList({ campainId, styles, }: Props) {
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

      <PageTitle styles='mt-5'>
        세션 목록
      </PageTitle>
    </>
  );
}
