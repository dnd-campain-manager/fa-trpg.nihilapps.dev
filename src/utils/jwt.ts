import { User } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { TokenInfo } from '@/src/entities';

export class Jwt {
  static async createAccessToken(user: User) {
    const { id, name, userRole, } = user;
    return sign(
      { id, name, userRole, },
      process.env.NEXT_PUBLIC_ACCESS_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
      }
    );
  }

  static async createRefreshToken(user: User) {
    const { id, name, userRole, } = user;

    return sign(
      { id, name, userRole, },
      process.env.NEXT_PUBLIC_REFRESH_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '90days',
      }
    );
  }

  static async verifyToken(
    token: string,
    mode: ('accessToken' | 'refreshToken')
  ): Promise<TokenInfo> {
    const secret = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_SECRET
      : process.env.NEXT_PUBLIC_REFRESH_SECRET;

    return verify(token, secret, {
      algorithms: [ 'HS256', ],
    }) as unknown as TokenInfo;
  }

  static isExpired(exp: number) {
    const now = Math.floor(Date.now() / 1000);

    const diff = Math.floor(exp) - now;

    console.log('diff >> ', diff);

    return diff < 0;
  }
}
