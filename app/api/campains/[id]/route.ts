import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { UpdateCampainDto } from '@/src/entities';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(
  req: NextRequest,
  { params, }: Params
) {
  const page = req.nextUrl.searchParams.get('page');

  const campain = await Db.campains().findFirst({
    where: {
      id: params.id,
    },
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
  });

  const pcs = campain.Pc;

  const newPcs = pcs.map((pc) => {
    const level1 = pc.Class[0].level;
    const level2 = pc.Class[1] ? pc.Class[1].level : 0;

    return {
      ...pc,
      totalLevel: level1 + level2,
    };
  });

  campain.Pc = newPcs;

  return NextResponse.json({
    data: campain,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req:NextRequest, { params, }: Params) {
  const {
    name, url, startTime, endTime, status,
  }: UpdateCampainDto = await req.json();
  const updateCampain = await Db.campains().update({
    where: {
      id: params.id,
    },
    data: {
      name,
      url,
      startTime: startTime === 'none-none-none' ? null : startTime,
      endTime: endTime === 'none-none-none' ? null : endTime,
      status,
    },
  });

  return NextResponse.json({
    data: updateCampain,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {
  const deleteCampain = await Db.campains().delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: deleteCampain,
    message: 'ok',
  }, {
    status: 200,
  });
}
