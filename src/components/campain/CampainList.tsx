'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Button } from '@/src/shadcn';
import { useCreateCampain, useGetCampains } from '@/src/hooks';
import { LoadingCircle } from '@/src/components';
import { Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

export function CampainList({ styles, }: Props) {
  const {
    data: campains,
    isLoading,
    isFetching,
  } = useGetCampains();

  const createCampain = useCreateCampain();

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (isFetching || isLoading) {
    return <LoadingCircle />;
  }

  return (
    <>
      <div className={css.default}>
        <Button size='sm'>캠페인 만들기</Button>
        {Nihil.string(campains.data)}
      </div>
    </>
  );
}
