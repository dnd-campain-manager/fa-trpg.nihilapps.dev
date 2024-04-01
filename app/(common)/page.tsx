import React from 'react';
import { Metadata } from 'next';
import { sign } from 'jsonwebtoken';
import { Jwt, setMeta } from '@/src/common';

export const metadata: Metadata = setMeta({
  title: '홈',
  url: '/',
});

export default async function IndexPage() {
  return (
    <>
      <div>content</div>
      {/*<HomePage />*/}
    </>
  );
}
