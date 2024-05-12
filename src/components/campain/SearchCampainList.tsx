'use client';

import React, { useCallback } from 'react';
import { useSearchCampain } from '@/src/hooks';
import {
  CampainItem, EmptyContent, LoadingCircle, MoreDataButton
} from '@/src/components';

interface Props {
  keyword: string;
}

export function SearchCampainList({ keyword, }: Props) {
  const {
    data: campains,
    isLoading,
    isFetching,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useSearchCampain(keyword);

  const onClickNextData = useCallback(
    () => {
      fetchNextPage();
    },
    []
  );

  if (isLoading || isFetching) {
    return <LoadingCircle />;
  }

  return (
    isSuccess && (
      <>
        <div className='mt-5 flex flex-col gap-5'>
          {campains.pages[0].data.campains.length === 0 && (
            <EmptyContent>
              {`"${keyword}"`} 관련 캠페인이 없습니다.
            </EmptyContent>
          )}

          {campains.pages.map((page) => {
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
