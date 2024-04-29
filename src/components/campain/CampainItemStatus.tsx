'use client';

import React from 'react';
import { Auth, Nihil } from '@/src/utils';
import { ExternalLink, InfoItem } from '@/src/components';
import { ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
}

export function CampainItemStatus({ campain, }: Props) {
  const mainMaster = Auth.findMainMaster(campain);

  return (
    <>
      <InfoItem name='캠페인 시작일'>
        {campain.startTime ? (
          Nihil.dateToFormat(campain.startTime)
        ) : (
          '준비중인 캠페인입니다.'
        )}
      </InfoItem>

      {campain.status === 'close' && (
        <InfoItem name='캠페인 종료일'>
          {campain.endTime ? (
            Nihil.dateToFormat(campain.endTime)
          ) : (
            '진행중인 캠페인입니다.'
          )}
        </InfoItem>
      )}

      <InfoItem name='메인 마스터'>
        {mainMaster.User.name}
      </InfoItem>

      <InfoItem name='서브 마스터'>
        {campain.Master.length !== 0 ? campain.Master.length - 1 : 0}명
      </InfoItem>

      <InfoItem name='세션 진행 횟수'>
        {campain.Session.length !== 0 ? campain.Session.length : 0}회
      </InfoItem>

      <InfoItem name='캠페인 링크'>
        <ExternalLink
          link={campain.url}
          label={campain.url}
        />
      </InfoItem>
    </>
  );
}
