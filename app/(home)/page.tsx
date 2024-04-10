import React from 'react';
import { Metadata } from 'next';
import { HomePage } from '@/src/components';
import { setMeta } from '@/src/utils';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function IndexPage() {
  return (
    <HomePage />
  );
}
