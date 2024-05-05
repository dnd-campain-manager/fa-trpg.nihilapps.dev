import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    campainId: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const sessionsByCampainId = await Db.sessions().findMany({
    where: {
      campainId: params.campainId,
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
    data: sessionsByCampainId,
    message: 'ok',
  }, {
    status: 200,
  });
}
