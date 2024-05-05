import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { UpdateSessionDto } from '@/src/entities';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const session = await Db.sessions().findFirst({
    where: {
      id: params.id,
    },
    include: {
      Master: {
        include: {
          Session: true,
          User: true,
        },
      },
      Campain: true,
    },
  });

  return NextResponse.json({
    data: session,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updateSessionDto: UpdateSessionDto = await req.json();

  const updateSession = await Db.sessions().update({
    where: {
      id: params.id,
    },
    data: updateSessionDto,
  });

  return NextResponse.json({
    data: updateSession,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(_req: NextRequest, { params, }: Params) {
  const deleteSession = await Db.sessions().delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: deleteSession,
    message: 'ok',
  }, {
    status: 200,
  });
}
