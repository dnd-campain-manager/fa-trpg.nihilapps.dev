import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { UpdateMasterDto } from '@/src/entities';

interface Params {
  params: {
    id: string;
  }
}

export async function PATCH(req: NextRequest) {
  const {
    masterId, userId, campainId, masterType,
  }: UpdateMasterDto = await req.json();

  const updatedMaster = await Db.masters().update({
    where: {
      id: masterId,
      userId,
      campainId,
    },
    data: {
      masterType,
    },
  });

  return NextResponse.json({
    data: updatedMaster,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(_req: NextRequest, { params, }: Params) {
  const deletedMaster = await Db.masters().delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: deletedMaster,
    message: 'ok',
  }, {
    status: 200,
  });
}
