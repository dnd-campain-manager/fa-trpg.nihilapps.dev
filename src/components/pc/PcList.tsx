'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useGetPcs } from '@/src/hooks';
import { LoadingCircle, PageTitle, PcListItem } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

export function PcList({ styles, }: Props) {
  const {
    data: pcs,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetPcs();

  const css = {
    default: twJoin([
      `flex flex-col gap-3`,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return <LoadingCircle />;
  }

  return (
    isSuccess && (
      <>
        <PageTitle level='h2' icon='fluent:people-community-24-filled'>
          PC 목록
        </PageTitle>

        <div className={css.default}>
          {pcs.data.map((pc) => (
            <PcListItem key={pc.id} pc={pc} />
          ))}
        </div>
      </>
    )
  );
}
