'use client';

import React, { useEffect } from 'react';
import { useIQGetCampains } from '@/src/hooks';
import {
  CampainItem,
  CampainSearch, EmptyContent, LoadingCircle, PageTitle
} from '@/src/components';

export function CampainList() {
  const {
    data: campains,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isSuccess,
  } = useIQGetCampains();

  if (isFetching || isLoading) {
    return (
      <LoadingCircle />
    );
  }

  return (
    isSuccess && (
      <>
        <PageTitle icon='mdi:archive'>
          캠페인 목록
        </PageTitle>

        <CampainSearch styles='mt-5 mb-2' />

        <div className='mt-5 flex flex-col gap-5'>
          {campains?.pages.length === 0 && (
            <EmptyContent>캠페인이 없습니다.</EmptyContent>
          )}
          {campains?.pages.map((page) => {
            return page.data.campains.map((item) => (
              <CampainItem key={item.id} campain={item} />
            ));
          })}
        </div>
      </>
    )
  );
}
