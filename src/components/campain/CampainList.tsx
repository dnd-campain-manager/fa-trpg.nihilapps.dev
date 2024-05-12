'use client';

import React, { useCallback } from 'react';
import { useIQGetCampains } from '@/src/hooks';
import {
  AddCampainButton,
  CampainItem,
  CampainSearch, EmptyContent, LoadingCircle, MoreDataButton, PageTitle
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

  const onClickNextData = useCallback(
    () => {
      fetchNextPage();
    },
    []
  );

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

        <AddCampainButton />

        <div className='mt-5 flex flex-col gap-5'>
          {campains.pages[0].data.campains.length === 0 && (
            <EmptyContent>
              캠페인이 없습니다.
            </EmptyContent>
          )}

          {campains?.pages.map((page) => {
            return page.data.campains.map((item) => (
              <CampainItem key={item.id} campain={item} />
            ));
          })}
        </div>

        {hasNextPage && (
          <MoreDataButton moreData={onClickNextData} />
        )}
      </>
    )
  );
}
