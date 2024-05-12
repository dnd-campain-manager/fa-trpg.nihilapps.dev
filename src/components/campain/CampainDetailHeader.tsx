'use client';

import React, { useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  AddPcButton,
  AddSessionButton,
  AddSubMasterButton,
  CampainItemStatus,
  PageTitle,
  UpdateCampainButton,
  WhiteBlock
} from '@/src/components';
import { Auth } from '@/src/utils';
import { authStore, ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainDetailHeader({ campain, styles, }: Props) {
  const session = authStore((state) => state.session);

  const isSubMaster = Auth.isSubMaster(campain, session);

  const isMainMaster = Auth.isMainMaster(campain, session);
  const isAdmin = Auth.isAdmin(session);

  const isEditable = isMainMaster || isAdmin;
  const isSessionCreatable = (isMainMaster || isSubMaster) || isAdmin;

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
      `rounded-2 p-1 px-4 text-middle inline-flex items-center justify-center font-900 border border-white`,
      campain.status === 'ready' && `bg-black-400 text-white`,
      campain.status === 'open' && `bg-green-500 text-white`,
      campain.status === 'close' && `bg-red-500 text-white`,
    ]),
    itemName: twJoin([
      `inline-block rounded-1 p-1 px-2 mr-2 bg-blue-200 text-black-base font-500`,
    ]),
  };

  return (
    <>
      <div className='flex flex-row items-stretch gap-2 mt-10 mb-2'>
        <PageTitle
          icon='mdi:archive'
          styles='!mb-0 mt-0 flex-1 shrink-0'
        >
          캠페인: {campain.name}
        </PageTitle>
        <span className={css.status}>
          {status}
        </span>
      </div>

      {session && (
        <div className='mb-5 flex flex-row gap-2 items-stretch justify-end'>
          {isEditable && (
            <>
              <UpdateCampainButton campain={campain} />
              <AddSubMasterButton campain={campain} />
            </>
          )}
          <AddPcButton campain={campain} />
          {isSessionCreatable && (
            <AddSessionButton campain={campain} />
          )}
        </div>
      )}

      <WhiteBlock>
        <CampainItemStatus campain={campain} />
      </WhiteBlock>
    </>
  );
}
