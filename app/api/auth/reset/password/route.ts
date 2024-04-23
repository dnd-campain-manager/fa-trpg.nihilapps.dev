import { NextRequest, NextResponse } from 'next/server';
import { ResetPasswordDto } from '@/src/entities';
import { DataHash, Db } from '@/src/utils';

export async function POST(req: NextRequest) {
  const { userId, signInId, newPassword, }: ResetPasswordDto = await req.json();

  console.log('newPassword >> ', newPassword);

  const hashedNewPassword = await DataHash.hashData(newPassword);

  await Db.auth().update({
    where: {
      id: signInId,
      userId,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return NextResponse.json({
    data: null,
    message: 'ok',
  }, {
    status: 200,
  });
}
