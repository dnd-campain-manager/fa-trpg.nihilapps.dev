import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { createMasterDto } from '@/src/entities';

export async function GET() {
  const masters = await Db.masters().findMany();

  return NextResponse.json({
    data: masters,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { userId, campainId, }: createMasterDto = await req.json();

  const newMaster = await Db.masters().create({
    data: {
      userId,
      campainId,
      masterType: 'subMaster',
    },
  });

  return NextResponse.json({
    data: newMaster,
    message: 'ok',
  }, {
    status: 201,
  });
}
