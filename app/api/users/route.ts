import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { Db } from '@/src/common';
import { CreateUserDto } from '@/src/entities';

export async function GET() {
  const users = await Db.users().findMany();

  return NextResponse.json({
    data: users,
    message: 'ok',
  }, {
    status: 409,
  });
}

export async function POST(req: NextRequest) {
  const {
    name, password, role, admin, create,
  }: CreateUserDto = await req.json();

  const findUser = await Db.users().findFirst({
    where: {
      name,
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
      role,
      admin,
      create,
    },
  });

  const hashedPassword = await hash(password, 10);

  await Db.auth().create({
    data: {
      userId: newUser.id,
      hashedPassword,
    },
  });

  return NextResponse.json({
    data: newUser,
    message: 'ok',
  }, {
    status: 200,
  });
}
