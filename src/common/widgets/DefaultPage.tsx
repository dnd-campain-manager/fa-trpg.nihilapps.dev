import React from 'react';
import { AppMain, Footer, Header } from '@/src/common';

interface Props {
  children: React.ReactNode;
}

export function DefaultPage({ children, }: Props) {
  return (
    <>
      <Header />

      <AppMain>
        {children}
      </AppMain>

      <Footer />
    </>
  );
}
