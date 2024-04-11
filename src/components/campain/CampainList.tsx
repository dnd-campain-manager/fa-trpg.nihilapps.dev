'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useCreateCampain, useGetCampains } from '@/src/hooks';
import { CampainSearch, LoadingCircle } from '@/src/components';
import {
  Button,
  Card, CardContent, CardHeader, CardTitle
} from '@/src/shadcn';
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
    title: twJoin([
      `mt-10 bg-primary border-primary text-center !font-900 !text-h4 text-white py-2`,
    ]),

  };

  if (isFetching || isLoading) {
    return <LoadingCircle />;
  }

  return (
    <>
      <Card className={css.title}>
        캠페인 목록
      </Card>

      <CampainSearch styles='mt-5' />

      <Button className='block mr-auto mt-2 !text-middle hover:!bg-blue-500'>캠페인 생성</Button>

      <div className='mt-5'>
        {campains.data.map((item) => (
          Nihil.string(item)
        ))}
      </div>
    </>
  );
}
