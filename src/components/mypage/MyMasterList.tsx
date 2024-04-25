'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ExtendedUser } from '@/src/entities';
import { EmptyContent, MasterItem, PageTitle } from '@/src/components';

interface Props {
  userData: ExtendedUser;
  styles?: ClassNameValue;
}

export function MyMasterList({ userData, styles, }: Props) {
  const masters = userData?.Master;

  const masterings = masters?.filter(
    (master) => master.Campain.status !== 'close'
  );

  const closeMastering = masters?.filter(
    (master) => master.Campain.status === 'close'
  );

  const css = {
    default: twJoin([
      `flex flex-col gap-3`,
      styles,
    ]),
  };

  return (
    <>
      <PageTitle styles='mt-5' level='h3' icon='iconoir:hexagon-dice'>
        마스터링 중 캠페인
      </PageTitle>

      <div className={css.default}>
        {masterings.length === 0 && (
          <EmptyContent>
            마스터링 중인 캠페인이 없습니다.
          </EmptyContent>
        )}

        {masterings.map((master) => (
          <MasterItem key={master.id} master={master} />
        ))}
      </div>

      <PageTitle styles='mt-5' level='h3' icon='iconoir:hexagon-dice'>
        마스터링 종료 캠페인
      </PageTitle>

      <div className={css.default}>
        {closeMastering.length === 0 && (
          <EmptyContent>
            종료된 캠페인이 없습니다.
          </EmptyContent>
        )}

        {closeMastering.map((master) => (
          <MasterItem key={master.id} master={master} />
        ))}
      </div>
    </>
  );
}
