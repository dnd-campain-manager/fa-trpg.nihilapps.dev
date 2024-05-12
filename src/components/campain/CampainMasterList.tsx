'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  EmptyContent,
  LoadingCircle,
  MasterListItem, MoreDataButton
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';
import { useIQGetMastersByCampainId } from '@/src/hooks';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainMasterList({ campain, styles, }: Props) {
  const {
    data: masters,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isSuccess,
  } = useIQGetMastersByCampainId(campain.id);

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
        <div className={css.default}>
          {masters.pages[0].data.masters.length === 0 && (
            <EmptyContent>
              서브 마스터가 없습니다.
            </EmptyContent>
          )}

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
          <MoreDataButton moreData={onClickNextData} />
        )}
      </>
    )
  );
}
