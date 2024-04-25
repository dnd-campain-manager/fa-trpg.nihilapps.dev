import { NextResponse } from 'next/server';
import { Db } from '@/src/utils';

export async function GET() {
  const users = await Db.userList();

  const userData = users.map((user) => ({
    id: user.id,
    name: user.name,
  }));

  return NextResponse.json({
    data: userData,
  }, {
    status: 200,
  });
}
