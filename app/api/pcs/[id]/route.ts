import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { UpdatePcDto } from '@/src/entities';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(_req: NextRequest, { params, }: Params) {
  const pc = await Db.pcs().findFirst({
    where: {
      id: params.id,
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
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updatedPcDto: UpdatePcDto = await req.json();

  const updatedPc = await Db.pcs().update({
    where: {
      id: params.id,
    },
    data: updatedPcDto,
  });

  return NextResponse.json({
    data: updatedPc,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(_req: NextRequest, { params, }: Params) {
  const deletedPc = await Db.sessions().delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: deletedPc,
    message: 'ok',
  }, {
    status: 200,
  });
}
