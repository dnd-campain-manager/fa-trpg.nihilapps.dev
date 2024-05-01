import React from 'react';
import { setMeta } from '@/src/utils';
import { AddUserForm } from '@/src/components';

interface Props {
  //
}

export const metadata = setMeta({
  title: '유저 추가',
  url: '/admin/add-users',
});

export default function AddUsersPage() {
  return (
    <>
      <AddUserForm />
    </>
  );
}
