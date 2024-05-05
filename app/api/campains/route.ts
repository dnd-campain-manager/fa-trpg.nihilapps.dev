import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreateCampainDto } from '@/src/entities';

export async function GET(req: NextRequest) {
  const { nextUrl, } = req;
  const page = nextUrl.searchParams.get('page');

  const campains = await Db.campains().findMany({
    include: {
      Session: {
        include: {
          Master: {
            include: {
              Session: true,
              User: true,
            },
          },
        },
      },
      Master: {
        include: {
          Session: true,
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
    skip: page ? (+page - 1) * +page : 0,
    take: 5,
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

export async function POST(req: NextRequest) {
  const {
    userId, name, status, url,
  }: CreateCampainDto = await req.json();

  const newCampain = await Db.campains().create({
    data: {
      name,
      status,
      url,
    },
  });

  await Db.masters().create({
    data: {
      userId,
      campainId: newCampain.id,
      masterType: 'mainMaster',
    },
  });

  return NextResponse.json({
    data: newCampain,
    message: 'ok',
  }, {
    status: 201,
  });
}
