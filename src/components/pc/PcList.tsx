'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useGetPcs } from '@/src/hooks';
import { LoadingCircle } from '@/src/components';
import { Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

export function PcList({ styles, }: Props) {
  const {
    data: pcs,
    isLoading,
    isFetching,
  } = useGetPcs();

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
      {Nihil.string(pcs)}

      <div className={css.default}>content</div>
    </>
  );
}
