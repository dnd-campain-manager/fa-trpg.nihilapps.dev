'use client';

import React, { useCallback, useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useSearchCampain } from '@/src/hooks';
import {
  CampainItem, CampainSearch, CustomButton, EmptyContent, LoadingCircle, PageTitle
} from '@/src/components';

interface Props {
  keyword: string;
  styles?: ClassNameValue;
}

export function SearchCampainList({ keyword, styles, }: Props) {
  const {
    data: campains,
    isLoading,
    isFetching,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useSearchCampain(keyword);

  const newCampains = useMemo(
    () => {
      return campains?.pages.map((page) => {
        return page.data.campains;
      });
    },
    [ campains, ]
  );

  console.log(newCampains);

  console.log(campains);

  const onClickNextData = useCallback(
    () => {
      fetchNextPage();
    },
    []
  );

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
    isSuccess && (
      <>
        <PageTitle level='h2' icon='mdi:archive'>
          {`"${keyword}"`} 관련 캠페인
        </PageTitle>

        <CampainSearch styles='mt-5 mb-2' />

        <div className='mt-5 flex flex-col gap-5'>
          {/*{campains.pages.map((page) => {*/}
          {/*  return page.data.campains.length === 0 && (*/}

          {/*  )*/}
          {/*})}*/}

          {campains.pages.map((page) => {
            return page.data.campains.map((item) => (
              <CampainItem key={item.id} campain={item} />
            ));
          })}
        </div>

        {hasNextPage && (
          <CustomButton full icon='ic:baseline-plus' actions={onClickNextData}>
            더 보기
          </CustomButton>
        )}
      </>
    )
  );
}
