import React from 'react';
import { AppMain, FooterBlock, HeaderBlock } from '@/src/components';

interface Props {
  children: React.ReactNode;
}

export function DefaultPage({ children, }: Props) {
  return (
    <>
      <HeaderBlock />

      <AppMain>
        {children}
      </AppMain>

      <FooterBlock />
    </>
  );
}
