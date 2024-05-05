import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    campainId: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const page = req.nextUrl.searchParams.get('page');
  const startId = req.nextUrl.searchParams.get('lastId');

  const masters = await Db.masters().findMany({
    where: {
      campainId: params.campainId,
      masterType: 'subMaster',
    },
    include: {
      Session: true,
      User: true,
      Campain: true,
    },
    skip: +page < 1 ? 0 : 1,
    take: 5,
    cursor: {
      id: startId || null,
    },
  });

  const lastId = masters.at(-1).id;

  return NextResponse.json({
    data: {
      masters,
      url: `/masters/campain/${params.campainId}?page=${+page + 1}&lastId=${lastId}`,
    },
    message: 'ok',
  }, {
    status: 200,
  });
}
