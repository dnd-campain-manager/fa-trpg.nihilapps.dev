import React from 'react';
import { setMeta } from '@/src/utils';

interface Props {
  //
}

export async function generateMetadata() {
  return setMeta({
    title: '',
    url: '',
  });
}

export default function SessionListPage() {
  return (
    <>
      <div>content</div>
    </>
  );
}
