'use client';

import React from 'react';
import { CustomButton } from '@/src/components';

interface Props {
  moreData: any;
}

export function MoreDataButton({ moreData, }: Props) {
  return (
    <>
      <CustomButton
        full
        icon='ic:baseline-plus'
        actions={moreData}
        styles='mt-5'
      >
        더 보기
      </CustomButton>
    </>
  );
}
