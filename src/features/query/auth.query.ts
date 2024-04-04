import {
  SignInDto, SignOutDto, TokenRefreshDto, UserSession
} from '@/src/entities';
import { Api } from '@/src/common';

export class AuthQuery {
  static async signInUser(signInDto: SignInDto) {
    const { data, } = await Api.post<UserSession, SignInDto>(
      '/auth/signin',
      signInDto
    );

    return data;
  }

  static async signOutUser(signOutDto: SignOutDto) {
    const { data, } = await Api.post<null, SignOutDto>(
      '/auth/signout',
      signOutDto
    );

    return data;
  }

  static async tokenRefresh(tokenRefreshDto: TokenRefreshDto) {
    const { data, } = await Api.post<UserSession, TokenRefreshDto>(
      '/auth/refresh',
      tokenRefreshDto
    );

    return data;
  }
}
