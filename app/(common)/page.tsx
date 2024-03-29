import React from 'react';
import { Metadata } from 'next';
import { setMeta } from '@/src/common';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function IndexPage() {
  return (
    <div>Home</div>
  );
}
