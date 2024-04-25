'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Auth, Nihil } from '@/src/utils';
import { ExternalLink } from '@/src/components';
import { CardContent } from '@/src/shadcn';
import { ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainItemStatus({ campain, styles, }: Props) {
  const mainMaster = Auth.findMainMaster(campain);

  const css = {
    default: twJoin([
      `!p-2 !text-middle flex flex-col gap-1`,
      styles,
    ]),
    itemName: twJoin([
      `inline-block rounded-1 p-1 px-2 mr-2 bg-blue-200 text-black-base font-500`,
    ]),
  };

  return (
    <>
      <CardContent className={css.default}>
        <p>
          <span className={css.itemName}>캠페인 시작일</span>
          {campain.startTime ? (
            Nihil.dateToFormat(campain.startTime)
          ) : (
            '준비중인 캠페인입니다.'
          )}
        </p>
        {campain.status === 'close' && (
          <p>
            <span className={css.itemName}>캠페인 종료일</span>
            {campain.endTime ? (
              Nihil.dateToFormat(campain.endTime)
            ) : (
              '진행중인 캠페인입니다.'
            )}
          </p>
        )}
        <p>
          <span className={css.itemName}>메인 마스터</span>
          {mainMaster.User.name}
        </p>
        <p>
          <span className={css.itemName}>서브 마스터</span>
          {campain.Master.length !== 0 ? campain.Master.length - 1 : 0}명
        </p>
        <p>
          <span className={css.itemName}>진행 세션수</span>
          {campain.Session.length !== 0 ? campain.Session.length : 0}회
        </p>
        <p>
          <span className={css.itemName}>캠페인 링크</span>
          <ExternalLink
            link={campain.url}
            label={campain.url}
          />
        </p>
      </CardContent>
    </>
  );
}
