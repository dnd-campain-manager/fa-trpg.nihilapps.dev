import { NextRequest, NextResponse } from 'next/server';
import { ChangePersonalDataDto, UserSession } from '@/src/entities';
import { Db, Jwt } from '@/src/utils';

export async function POST(req: NextRequest) {
  const {
    userId,
    signInId,
    newName,
    newEmail,
  }: ChangePersonalDataDto = await req.json();

  const findUser = await Db.users().findFirst({
    where: {
      name: newName,
    },
  });

  if (findUser && findUser.id !== userId) {
    return NextResponse.json({
      data: null,
      message: '이미 존재하는 이름입니다. 다른 이름을 입력해주세요.',
    }, {
      status: 400,
    });
  }

  const user = await Db.users().update({
    where: {
      id: userId,
    },
    include: {
      Master: true,
      Pc: true,
    },
    data: {
      name: newName,
      email: newEmail,
    },
  });

  const auth = await Db.auth().findFirst({
    where: {
      id: signInId,
      userId,
    },
  });

  const accessTokenInfo = await Jwt.verifyToken(
    auth.accessToken,
    'accessToken'
  );

  const refreshTokenInfo = await Jwt.verifyToken(
    auth.refreshToken,
    'refreshToken'
  );

  const userSession: UserSession = {
    userId: user.id,
    signInId,
    accessToken: auth.accessToken,
    accessExp: accessTokenInfo.exp,
    refreshToken: auth.refreshToken,
    refreshExp: refreshTokenInfo.exp,
  };

  return NextResponse.json({
    data: userSession,
    message: 'ok',
  }, {
    status: 200,
  });
}
