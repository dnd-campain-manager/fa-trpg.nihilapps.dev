import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    name: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const sessions = await Db.sessions().findMany({
    where: {
      name: params.name,
    },
    include: {
      Master: {
        select: {
          masterType: true,
          User: true,
        },
      },
      Campain: true,
    },
    orderBy: {
      number: 'desc',
    },
  });

  if (!sessions) {
    return NextResponse.json({
      data: null,
      message: 'not found session',
    }, {
      status: 400,
    });
  }

  return NextResponse.json({
    data: sessions,
    message: 'ok',
  }, {
    status: 200,
  });
}
