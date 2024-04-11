import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    name: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const campains = await Db.campains().findMany({
    where: {
      name: params.name,
    },
  });

  if (!campains) {
    return NextResponse.json({
      data: null,
      message: 'not found campain',
    }, {
      status: 400,
    });
  }

  return NextResponse.json({
    data: campains,
    message: 'ok',
  }, {
    status: 200,
  });
}
