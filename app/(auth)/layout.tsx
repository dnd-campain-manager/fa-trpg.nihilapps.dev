import React from 'react';
import { setMeta } from '@/src/common';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: Props) {
  return (
    <main className='w-full p-5 mo-md:max-w-[900px] mx-auto'>
      {children}
    </main>
  );
}
