import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFileSync } from 'fs';

import { Db, Nihil } from '@/src/utils';

export async function GET() {
  const users = await Db.userList();

  const userData = users.map((user) => ({
    id: user.id,
    name: user.name,
  }));

  const filePath = join(process.cwd(), 'src', 'data', 'user.data.json');

  writeFileSync(filePath, Nihil.string(userData), {
    encoding: 'utf-8',
  });

  return NextResponse.json({
    data: userData,
    message: 'ok',
  }, {
    status: 200,
  });
}
