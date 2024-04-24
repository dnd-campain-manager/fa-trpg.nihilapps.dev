import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreatePcDto } from '@/src/entities';

export async function GET() {
  const pcs = await Db.pcs().findMany({
    include: {
      User: true,
      Campain: true,
      Class: true,
    },
  });

  return NextResponse.json({
    data: pcs,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    userId,
    campainId,
    name,
    age,
    organization,
    story,
    url,
    className1,
    className2,
    level1,
    level2,
  }: CreatePcDto = await req.json();

  const createdPc = await Db.pcs().create({
    data: {
      userId,
      campainId,
      name,
      age,
      organization,
      story,
      url,
    },
  });

  await Db.classData().create({
    data: {
      pcId: createdPc.id,
      className: className1,
      level: level1,
    },
  });

  if ((className2 === 'none') && level2) {
    await Db.classData().create({
      data: {
        pcId: createdPc.id,
        className: className2,
        level: level2,
      },
    });
  }

  const pc = await Db.pcs().findFirst({
    where: {
      id: createdPc.id,
    },
    include: {
      User: true,
      Campain: true,
      Class: true,
    },
  });

  return NextResponse.json({
    data: pc,
    message: 'ok',
  }, {
    status: 201,
  });
}
