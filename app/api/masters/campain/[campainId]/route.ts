import { NextRequest, NextResponse } from 'next/server';
import { Db, Nihil } from '@/src/utils';
import { configData } from '@/src/data';

interface Params {
  params: {
    campainId: string;
  }
}

export async function GET(req: NextRequest, { params, }: Params) {
  const page = req.nextUrl.searchParams.get('page');

  if (page) {
    const masters = await Db.masters().findMany({
      where: {
        campainId: params.campainId,
        masterType: 'subMaster',
      },
      include: {
        Session: true,
        User: true,
        Campain: true,
      },
      skip: +page ? ((+page - 1) * configData.perPage) : 0,
      take: configData.perPage,
    });

    const totalCounts = await Db.masters().count({
      where: {
        campainId: params.campainId,
        masterType: 'subMaster',
      },
    });

    const hasNextPage = Nihil.hasNextPage(
      masters.length,
      configData.perPage,
      +page,
      totalCounts
    );

    return NextResponse.json({
      data: {
        masters,
        total: totalCounts,
        page: hasNextPage ? (+page + 1) : null,
      },
      message: 'ok',
    }, {
      status: 200,
    });
  } else {
    const masters = await Db.masters().findMany({
      where: {
        campainId: params.campainId,
      },
      include: {
        Session: true,
        User: true,
        Campain: true,
      },
    });

    return NextResponse.json({
      data: masters,
      message: 'ok',
    }, {
      status: 200,
    });
  }
}
