import { NextRequest, NextResponse } from 'next/server';
import { Db, Nihil } from '@/src/utils';
import { CreateSessionsDto } from '@/src/entities';
import { configData } from '@/src/data';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');

  const sessions = await Db.sessions().findMany({
    include: {
      Master: {
        include: {
          Session: true,
          User: true,
        },
      },
      Campain: true,
      SessionJoin: {
        include: {
          Pc: true,
        },
      },
    },
    orderBy: {
      number: 'desc',
    },
    skip: +page ? ((+page - 1) * configData.perPage) : 0,
    take: configData.perPage,
  });

  const totalCounts = await Db.sessions().count();

  const hasNextPage = Nihil.hasNextPage(
    sessions.length,
    configData.perPage,
    +page,
    totalCounts
  );

  return NextResponse.json({
    data: {
      sessions,
      total: totalCounts,
      page: hasNextPage ? (+page + 1) : null,
    },
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    campainId, masterId, number, name, startTime, endTime, playersNumber, content, gameTime,
  }: CreateSessionsDto = await req.json();

  const newSession = await Db.sessions().create({
    data: {
      campainId,
      masterId,
      number,
      name,
      startTime,
      endTime,
      playersNumber,
      content,
      gameTime,
    },
  });

  return NextResponse.json({
    data: newSession,
    message: 'ok',
  }, {
    status: 201,
  });
}
