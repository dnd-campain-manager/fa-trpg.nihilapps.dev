import React from 'react';
import { setMeta } from '@/src/utils';
import { AddUserButton } from '@/src/components/admin/AddUserButton';

interface Props {
  //
}

export const metadata = setMeta({
  title: '',
  url: '',
});

export default function AdminPage() {
  return (
    <>
      <AddUserButton />
    </>
  );
}
