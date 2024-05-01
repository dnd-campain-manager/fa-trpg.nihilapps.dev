import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';

interface Params {
  params: {
    name: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const pcs = await Db.pcs().findMany({
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

  const newPcs = pcs.map((pc) => {
    const level1 = pc.Class[0].level;
    const level2 = pc.Class[1] ? pc.Class[1].level : 0;

    return {
      ...pc,
      totalLevel: level1 + level2,
    };
  });

  return NextResponse.json({
    data: newPcs,
    message: 'ok',
  }, {
    status: 200,
  });
}
