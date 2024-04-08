import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignInDto, UserSession } from '@/src/entities';
import { Db, Jwt, Nihil } from '@/src/common';

export async function POST(req: NextRequest) {
  const { name, password, }: SignInDto = await req.json();

  const findUser = await Db.users().findFirst({
    where: {
      name,
    },
  });

  if (!findUser.name) {
    return NextResponse.json({
      data: null,
      message: 'not found user',
    }, {
      status: 400,
    });
  }

  const userAuth = await Db.auth().findFirst({
    where: {
      userId: findUser.id,
    },
  });

  const passwordMatch = await compare(password, userAuth.password);

  console.log('passwordMatch >> ', passwordMatch);

  if (!passwordMatch) {
    return NextResponse.json({
      data: null,
      message: 'password mismatch',
    }, {
      status: 401,
    });
  }

  const accessToken = await Jwt.createAccessToken(findUser);
  const refreshToken = await Jwt.createRefreshToken(findUser);

  const accessTokenInfo = await Jwt.verifyToken(accessToken, 'accessToken');
  const refreshTokenInfo = await Jwt.verifyToken(refreshToken, 'refreshToken');

  const auth = await Db.auth().update({
    where: {
      id: userAuth.id,
      userId: findUser.id,
    },
    data: {
      accessToken,
      refreshToken,
    },
  });

  const session: UserSession = {
    ...findUser,
    signInId: userAuth.id,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    accessExp: accessTokenInfo.exp,
    refreshExp: refreshTokenInfo.exp,
  };

  cookies().set('session', Nihil.string(session), {
    expires: new Date(session.accessExp * 1000),
    httpOnly: true,
  });

  return NextResponse.json({
    data: session,
    message: 'ok',
  }, {
    status: 200,
  });
}
