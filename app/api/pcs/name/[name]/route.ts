import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    name: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const pc = await Db.pcs().findMany({
    where: {
      name: params.name,
    },
    include: {
      User: true,
      Campain: true,
      Class: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return NextResponse.json({
    data: pc,
    message: 'ok',
  }, {
    status: 200,
  });
}
