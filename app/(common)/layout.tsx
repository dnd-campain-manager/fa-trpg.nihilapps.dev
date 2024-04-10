import React from 'react';
import { DefaultPage } from '@/src/widgets';

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
