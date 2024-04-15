import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { updateMasterDto } from '@/src/entities';

interface Params {
  params: {
    name: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const campainId = req.nextUrl.searchParams.get('campainId');

  const user = await Db.users().findFirst({
    where: {
      name: params.name,
    },
  });

  const master = await Db.masters().findFirst({
    where: {
      userId: user.id,
      campainId,
    },
  });

  return NextResponse.json({
    data: master,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const { masterId, campainId, masterType, }: updateMasterDto = await req.json();

  const user = await Db.users().findFirst({
    where: {
      name: params.name,
    },
  });

  const updatedMaster = await Db.masters().update({
    where: {
      id: masterId,
      userId: user.id,
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
