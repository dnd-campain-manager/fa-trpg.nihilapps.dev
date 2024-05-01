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
    include: {
      Session: {
        include: {
          Master: {
            select: {
              masterType: true,
              User: true,
            },
          },
        },
      },
      Master: {
        select: {
          masterType: true,
          User: true,
        },
      },
      Pc: {
        include: {
          Class: true,
          User: true,
        },
      },
    },
    orderBy: {
      startTime: 'desc',
    },
  });

  const newCampains = campains.map((campain) => {
    const pcs = campain.Pc;

    const newPcs = pcs.map((pc) => {
      const level1 = pc.Class[0].level;
      const level2 = pc.Class[1] ? pc.Class[1].level : 0;

      return {
        ...pc,
        totalLevel: level1 + level2,
      };
    });

    return {
      ...campain,
      Pc: newPcs,
    };
  });

  return NextResponse.json({
    data: newCampains,
    message: 'ok',
  }, {
    status: 200,
  });
}
