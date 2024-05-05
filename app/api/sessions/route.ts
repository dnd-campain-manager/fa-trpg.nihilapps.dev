import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreateSessionsDto } from '@/src/entities';

export async function GET() {
  const sessions = await Db.sessions().findMany({
    include: {
      Master: {
        include: {
          Session: true,
          User: true,
        },
      },
      Campain: true,
    },
    orderBy: {
      number: 'desc',
    },
  });

  return NextResponse.json({
    data: sessions,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    campainId, masterId, number, name, startTime, endTime, playersNumber, players, content, gameTime,
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
      players,
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
