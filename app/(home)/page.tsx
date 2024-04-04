import React from 'react';
import { Metadata } from 'next';
import { setMeta } from '@/src/common';
import { HomePage } from '@/src/components';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function IndexPage() {
  return (
    <HomePage />
  );
}
