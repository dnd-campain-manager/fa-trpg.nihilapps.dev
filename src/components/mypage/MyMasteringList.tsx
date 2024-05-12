'use client';

import React, { useCallback } from 'react';
import { authStore } from '@/src/entities';
import { UseIQGetMasterByUserId } from '@/src/hooks';
import {
  EmptyContent, LoadingCircle, MasterItem, MoreDataButton
} from '@/src/components';

interface Props {
  status: string;
}

export function MyMasteringList({ status, }: Props) {
  const { session, } = authStore();

  const {
    data: masters,
    isLoading,
    isFetching,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = UseIQGetMasterByUserId(session?.userId, status);

  const onClickNextData = useCallback(
    () => {
      fetchNextPage();
    },
    []
  );

  if (isLoading || isFetching) {
    return (
      <LoadingCircle />
    );
  }

  return (
    isSuccess && (
      <>
        <div className='mt-5 space-y-3 mb-5'>
          {masters.pages[0].data.masters.length === 0 && (
            <EmptyContent>
              {status === 'open' ? (
                '마스터링 중인 캠페인이 없습니다.'
              ) : (
                '마스터링 종료 캠페인이 없습니다.'
              )}
            </EmptyContent>
          )}

          {masters.pages.map((page) => (
            page.data.masters.map((master) => (
              <MasterItem key={master.id} master={master} />
            ))
          ))}
        </div>

        {hasNextPage && (
          <MoreDataButton moreData={onClickNextData} />
        )}
      </>
    )
  );
}
