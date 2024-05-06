import { NextRequest, NextResponse } from 'next/server';
import { Db, Nihil } from '@/src/utils';
import { CreateCampainDto } from '@/src/entities';
import { configData } from '@/src/data';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');

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
    skip: +page ? ((+page - 1) * configData.perPage) : 0,
    take: configData.perPage,
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

  const totalCounts = await Db.campains().count();

  const hasNextPage = Nihil.hasNextPage(
    newCampains.length,
    configData.perPage,
    +page,
    totalCounts
  );

  return NextResponse.json({
    data: {
      campains: newCampains,
      total: totalCounts,
      page: hasNextPage ? (+page + 1) : null,
    },
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
