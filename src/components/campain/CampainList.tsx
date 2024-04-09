'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  LoadingCircle, Nihil, useCreateCampain, useGetCampains
} from '@/src/common';
import { Button } from '@/src/shadcn';

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
