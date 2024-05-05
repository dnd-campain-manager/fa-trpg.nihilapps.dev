'use client';

import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useUpdateMaster } from '@/src/hooks';
import { CustomButton, InfoItem, WhiteBlock } from '@/src/components';
import { authStore, CustomMaster, ExtendedCampain } from '@/src/entities';
import { Auth, Nihil } from '@/src/utils';
import { campainsKeys } from '@/src/data';

interface Props {
  master: CustomMaster;
  campain: ExtendedCampain;
}

export function MasterListItem({ master, campain, }: Props) {
  const { session, } = authStore();
  const isMainMaster = Auth.isMainMaster(campain, session);
  const isAdmin = Auth.isAdmin(session);

  const qc = useQueryClient();
  const updateMaster = useUpdateMaster(master.id);

  const onClickLeaveSubMaster = useCallback(
    () => {
      updateMaster.mutate({
        userId: session?.userId,
        campainId: campain.id,
        masterId: master.id,
        masterStatus: 'leave',
      }, {
        onSuccess() {
          Nihil.toast({
            type: 'success',
            text: `${master.User.name}님은 더 이상 ${campain.name} 캠페인의 서브 마스터가 아닙니다.`,
          });

          qc.invalidateQueries({
            queryKey: campainsKeys.getById(campain.id),
          });
        },
      });
    },
    [ campain, master, session, qc, ]
  );

  return (
    <WhiteBlock key={master.User.id}>
      <div className='flex flex-row justify-between items-start'>
        <div className='space-y-2'>
          <InfoItem name='마스터 이름'>
            {master.User.name}
          </InfoItem>
          <InfoItem name='마스터 분류'>
            {master.masterType === 'mainMaster' ? (
              '메인 마스터'
            ) : (
              '서브 마스터'
            )}
          </InfoItem>
          <InfoItem name='세션 진행 횟수'>
            {master.Session.length}회
          </InfoItem>
        </div>
        <div className='flex flex-row gap-2'>
          {(isMainMaster || isAdmin) && (
            <CustomButton h36 actions={onClickLeaveSubMaster}>
              등록 취소
            </CustomButton>
          )}
          <Link href={`/users/${master.User.id}`}>
            <CustomButton h36>
              유저 정보 열람
            </CustomButton>
          </Link>
        </div>
      </div>
    </WhiteBlock>
  );
}
