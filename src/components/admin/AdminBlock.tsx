'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { CustomButton, WhiteBlock } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

export function AdminBlock({ styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <WhiteBlock>
        <Link href='/admin/add-users'>
          <CustomButton full icon='mdi:user'>
            유저 추가
          </CustomButton>
        </Link>
      </WhiteBlock>
    </>
  );
}
