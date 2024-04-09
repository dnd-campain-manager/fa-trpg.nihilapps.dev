import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/common';

interface Params {
  params: {
    id: string;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const campain = await Db.campains().findFirst({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    data: campain,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req:NextRequest, { params, }: Params) {
  const updateCampainDto = await req.json();
  const updateCampain = await Db.campains().update({
    where: {
      id: params.id,
    },
    data: updateCampainDto,
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
