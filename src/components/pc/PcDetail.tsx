'use client';

import React from 'react';
import Link from 'next/link';
import {
  CustomButton, ExternalLink, InfoItem, LoadingCircle, PageTitle, WhiteBlock
} from '@/src/components';
import { useGetPcById } from '@/src/hooks';
import { authStore } from '@/src/entities';
import { classObj, expData } from '@/src/data';

interface Props {
  pcId: string;
}

export function PcDetail({ pcId, }: Props) {
  const {
    data: pc,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetPcById(pcId);

  const { session, } = authStore();

  const isMyPc = session?.userId === pc?.data.userId;
  const totalLevel = pc?.data.Class[1] ? (
    pc.data.Class[0].level + pc.data.Class[1].level
  ) : (
    pc?.data.Class[0].level
  );

  if (isLoading || isFetching) {
    return <LoadingCircle />;
  }

  return (
    isSuccess && (
      <>
        <PageTitle level='h2' icon='fluent:people-community-20-filled'>
          {pc.data.name} PC 상세 정보
        </PageTitle>

        <div className='flex flex-row items-center justify-end gap-3 -mt-3 mb-5'>
          {isMyPc && (
            <Link href='/mypage'>
              <CustomButton h36>마이페이지로</CustomButton>
            </Link>
          )}
          <Link href='/pcs'>
            <CustomButton h36>PC 목록으로</CustomButton>
          </Link>
        </div>

        <WhiteBlock>
          <InfoItem name='플레이어'>
            {pc.data.User.name}
          </InfoItem>

          <InfoItem name='이름'>
            {pc.data.name}
          </InfoItem>

          <InfoItem name='나이'>
            {pc.data.age}
          </InfoItem>

          <InfoItem name='클래스 / 레벨'>
            {classObj[pc.data.Class[0].className]} {pc.data.Class[0].level}레벨
            {pc?.data.Class[1] && (
              <> / {classObj[pc.data.Class[1].className]} {pc.data.Class[1].level}레벨</>
            )}
          </InfoItem>

          <InfoItem name='경험치'>
            {pc.data.exp}pt / {expData[totalLevel]}pt
          </InfoItem>

          <InfoItem name='소속'>
            {pc.data.organization}
          </InfoItem>

          <InfoItem name='배경 스토리' pre>
            {pc.data.story}
          </InfoItem>

          <InfoItem name='비욘드 주소'>
            <ExternalLink link={pc.data.url} label={pc.data.url} />
          </InfoItem>
        </WhiteBlock>
      </>
    )
  );
}
