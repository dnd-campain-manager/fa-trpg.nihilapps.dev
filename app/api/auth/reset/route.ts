import { NextRequest, NextResponse } from 'next/server';
import { UserCheck } from '@/src/entities';
import { DataHash, Db } from '@/src/utils';

export async function POST(req: NextRequest) {
  const {
    userId, signInId, password,
  }: UserCheck = await req.json();

  const user = await Db.users().findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({
      data: null,
      message: '존재하지 않는 계정입니다.',
    }, {
      status: 400,
    });
  }

  const auth = await Db.auth().findFirst({
    where: {
      id: signInId,
    },
  });

  const matchPassword = await DataHash.compareData(
    password,
    auth.password
  );

  if (!matchPassword) {
    return NextResponse.json({
      data: null,
      message: '비밀번호가 일치하지 않습니다.',
    }, {
      status: 401,
    });
  }

  return NextResponse.json({
    data: null,
    message: 'ok',
  }, {
    status: 200,
  });
}
