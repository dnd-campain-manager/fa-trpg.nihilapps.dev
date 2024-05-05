'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  CustomButton,
  LoadingCircle,
  MasterListItem, PageTitle
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';
import { useIQGetMastersByCampainId } from '@/src/hooks';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainMasterList({ campain, styles, }: Props) {
  const mastersCount = campain.Master.length;

  const {
    data: masters,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isSuccess,
  } = useIQGetMastersByCampainId(campain.id);

  console.log(masters?.pages);

  const onClickNextData = useCallback(
    () => {
      fetchNextPage();
    },
    []
  );

  const css = {
    default: twJoin([
      `mt-5 space-y-3 mb-5`,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return (
      <LoadingCircle styles='mt-5' />
    );
  }

  return (
    isSuccess && (
      <>
        <PageTitle level='h3' icon='mdi:alpha-m-circle' styles='mt-5'>
          마스터 목록
        </PageTitle>

        <div className={css.default}>
          {masters.pages.map((page) => {
            return page.data.masters
              .map((master) => (
                <MasterListItem
                  key={master.id}
                  campain={campain}
                  master={master}
                />
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
