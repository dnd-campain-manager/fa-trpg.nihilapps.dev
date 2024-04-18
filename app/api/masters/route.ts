import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreateMasterDto } from '@/src/entities';

export async function GET() {
  const masters = await Db.masters().findMany({
    include: {
      User: true,
      Session: true,
    },
  });

  return NextResponse.json({
    data: masters,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { userId, campainId, masterType, }: CreateMasterDto = await req.json();

  const newMaster = await Db.masters().create({
    data: {
      userId,
      campainId,
      masterType,
    },
  });

  return NextResponse.json({
    data: newMaster,
    message: 'ok',
  }, {
    status: 201,
  });
}
