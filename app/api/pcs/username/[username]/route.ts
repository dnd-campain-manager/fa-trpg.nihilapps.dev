import { NextRequest, NextResponse } from 'next/server';
import { Db, Nihil } from '@/src/utils';
import { configData } from '@/src/data';

interface Params {
  params: {
    username: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const page = req.nextUrl.searchParams.get('page');

  const pcs = await Db.pcs().findMany({
    where: {
      User: {
        name: params.username,
      },
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
    skip: +page ? ((+page - 1) * configData.perPage) : 0,
    take: configData.perPage,
  });

  const newPcs = pcs.map((pc) => {
    const level1 = pc.Class[0].level;
    const level2 = pc.Class[1] ? pc.Class[1].level : 0;

    return {
      ...pc,
      totalLevel: level1 + level2,
    };
  });

  const totalCounts = await Db.pcs().count();

  const hasNextPage = Nihil.hasNextPage(
    newPcs.length,
    configData.perPage,
    +page,
    totalCounts
  );

  return NextResponse.json({
    data: {
      pcs: newPcs,
      total: totalCounts,
      page: hasNextPage ? (+page + 1) : null,
    },
    message: 'ok',
  }, {
    status: 200,
  });
}
