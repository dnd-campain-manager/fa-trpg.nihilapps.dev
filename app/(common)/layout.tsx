import React from 'react';
import { DefaultPage } from '@/src/common';

interface Props {
  children: React.ReactNode;
}

export default function CommonLayout({ children, }: Props) {
  return (
    <>
      <DefaultPage>
        {children}
      </DefaultPage>
    </>
  );
}
