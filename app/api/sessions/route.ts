import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/utils';
import { CreateSessionsDto } from '@/src/entities';

export async function GET() {
  const sessions = await Db.sessions().findMany();

  return NextResponse.json({
    data: sessions,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    campainId, masterId, number, name, startTime, endTime, exp, playersNumber, players, content, rewardUrl,
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
    },
  });

  return NextResponse.json({
    data: newSession,
    message: 'ok',
  }, {
    status: 201,
  });
}
