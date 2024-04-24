import { NextRequest, NextResponse } from 'next/server';
import { Db, Nihil } from '@/src/utils';
import { ExtendedUser, UpdateUserDto } from '@/src/entities';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const user = await Db.users().findFirst({
    where: {
      id: params.id,
    },
    include: {
      Master: {
        include: {
          Session: true,
          Campain: true,
        },
      },
      Pc: {
        include: {
          Campain: true,
          Class: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: Nihil.undefinedToString<ExtendedUser>(user),
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updateUserDto: UpdateUserDto = await req.json();

  const updateUser = await Db.users().update({
    where: {
      id: params.id,
    },
    data: updateUserDto,
  });

  return NextResponse.json({
    data: updateUser,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {
  const deleteUser = await Db.users().delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: deleteUser,
    message: 'ok',
  }, {
    status: 200,
  });
}
