import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignOutDto } from '@/src/entities';
import { Db } from '@/src/common';

export async function POST(req: NextRequest) {
  const { signInId, userId, }: SignOutDto = await req.json();

  await Db.auth().update({
    where: {
      id: signInId,
      userId,
    },
    data: {
      accessToken: null,
    },
  });

  cookies().set('session', '', {
    expires: new Date(0),
  });

  return NextResponse.json({
    data: null,
    message: 'ok',
  }, {
    status: 200,
  });
}
