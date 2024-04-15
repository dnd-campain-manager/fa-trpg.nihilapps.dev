'use client';

import React, { useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { AddSubMasterButton, CustomButton, PageTitle } from '@/src/components';
import { Card, CardContent } from '@/src/shadcn';
import { Nihil } from '@/src/utils';
import { authStore, ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainDetailHeader({ campain, styles, }: Props) {
  const session = authStore((state) => state.session);

  const masters = campain.Master;

  const findMainMaster = () => {
    const mainMaster = masters.find((item) => (
      item.masterType === 'mainMaster'
    ));

    return mainMaster;
  };

  const mainMaster = useMemo(() => {
    const master = findMainMaster();

    return master;
  }, [ campain, ]);

  const subMaster = useMemo(
    () => {
      const subMasters = masters.filter((item) => (
        item.masterType === 'subMaster'
      ));

      return subMasters;
    },
    [ masters, ]
  );

  const isSubMaster = useMemo(
    () => {
      return subMaster.find((item) => (
        item.User.id === session.id
      ));
    },
    [ session, subMaster, ]
  );

  const isEditable = (session?.id === mainMaster.User.id)
   || session?.userRole === 'admin';

  const isSessionCreatable = ((session?.id === mainMaster.User.id) || isSubMaster)
    || session?.userRole === 'admin';

  const status = useMemo(() => {
    const statusLabel = {
      ready: '준비중',
      open: '진행중',
      close: '종료',
    };

    return statusLabel[campain.status];
  }, [ campain, ]);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    status: twJoin([
      `rounded-2 p-1 px-2 text-middle inline-flex items-center justify-center font-900 border border-white`,
      campain.status === 'ready' && ``,
      campain.status === 'open' && `bg-green-500 text-white`,
      campain.status === 'close' && ``,
    ]),
    itemName: twJoin([
      `inline-block rounded-1 p-1 px-2 mr-2 bg-blue-200 text-black-base font-500`,
    ]),
  };

  return (
    <>
      <div className='flex flex-row items-stretch gap-2 mt-10 mb-2'>
        <PageTitle styles='mb-0 mt-0 flex-1 shrink-0'>{campain.name}</PageTitle>
        <span className={css.status}>
          {status}
        </span>
      </div>

      {session && (
        <div className='mb-5 flex flex-row gap-2 items-stretch justify-end'>
          {isEditable && (
            <>
              <CustomButton>
                <Icon icon='material-symbols:settings-rounded' />
              </CustomButton>
              <AddSubMasterButton campain={campain} />
            </>
          )}
          <CustomButton>캐릭터 등록</CustomButton>
          {isSessionCreatable && (
            <CustomButton>세션 생성</CustomButton>
          )}
        </div>
      )}

      <Card className='mt-5'>
        <CardContent className='!p-2 !text-middle flex flex-col gap-1'>
          <p>
            <span className={css.itemName}>캠페인 시작일</span>
            {Nihil.dateToFormat(campain.createdAt)}
          </p>
          {campain.status === 'close' && (
            <p>
              <span className={css.itemName}>캠페인 종료일</span>
              {Nihil.dateToFormat(campain.updatedAt)}
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
            <a
              href={campain.url}
              target='_blank'
              rel='noreferrer noopener'
              className='underline text-black-base hover:text-blue-500 transition-colors duration-200'
            >
              {campain.url}
            </a>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
