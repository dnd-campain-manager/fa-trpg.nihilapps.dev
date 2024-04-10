import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TokenRefreshDto, UserSession } from '@/src/entities';
import { Db, Jwt, Nihil } from '@/src/utils';

export async function POST(req: NextRequest) {
  const { userId, signInId, refreshToken, }: TokenRefreshDto = await req.json();

  const refreshTokenInfo = await Jwt.verifyToken(
    refreshToken,
    'refreshToken'
  );

  if (Jwt.isExpired(refreshTokenInfo.exp)) {
    cookies().set('session', '', {
      expires: new Date(0),
    });

    return NextResponse.json({
      data: null,
      message: 'need signin',
    }, {
      status: 401,
    });
  }

  const user = await Db.users().findFirst({
    where: {
      id: userId,
    },
  });

  if (refreshTokenInfo.id !== userId) {
    return NextResponse.json({
      data: null,
      message: 'mismatch refresh token',
    }, {
      status: 401,
    });
  }

  const newAccessToken = await Jwt.createAccessToken(user);
  const newAccessTokenInfo = await Jwt.verifyToken(
    newAccessToken,
    'accessToken'
  );

  await Db.auth().update({
    where: {
      id: signInId,
    },
    data: {
      accessToken: newAccessToken,
    },
  });

  const newSession: UserSession = {
    ...user,
    signInId,
    accessToken: newAccessToken,
    accessExp: newAccessTokenInfo.exp,
    refreshToken,
    refreshExp: refreshTokenInfo.exp,
  };

  cookies().set('session', Nihil.string(newSession), {
    expires: new Date(newSession.accessExp * 1000),
    httpOnly: true,
  });

  return NextResponse.json({
    data: newSession,
    message: 'ok',
  }, {
    status: 200,
  });
}
