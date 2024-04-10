import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreateCampainDto } from '@/src/entities';

export async function GET() {
  const campains = await Db.campains().findMany();

  return NextResponse.json({
    data: campains,
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
