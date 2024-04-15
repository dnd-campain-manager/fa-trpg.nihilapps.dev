import { NextRequest, NextResponse } from 'next/server';
import { DataHash, Db } from '@/src/utils';
import { CreateUserDto } from '@/src/entities';

export async function GET() {
  const users = await Db.users().findMany({
    include: {
      Master: true,
      Pc: true,
    },
  });

  return NextResponse.json({
    data: users,
    message: 'ok',
  }, {
    status: 409,
  });
}

export async function POST(req: NextRequest) {
  const {
    name, password, userRole, userType,
  }: CreateUserDto = await req.json();

  const findUser = await Db.users().findFirst({
    where: {
      name,
    },
    include: {
      Master: true,
      Pc: true,
    },
  });

  if (findUser) {
    return NextResponse.json({
      data: null,
      message: 'name conflict',
    }, {
      status: 409,
    });
  }

  const newUser = await Db.users().create({
    data: {
      name,
      userType,
      userRole,
    },
  });

  const hashedPassword = await DataHash.hashData(password);

  await Db.auth().create({
    data: {
      userId: newUser.id,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    data: newUser,
    message: 'ok',
  }, {
    status: 201,
  });
}
