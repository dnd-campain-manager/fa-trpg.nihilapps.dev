import {
  ResetPasswordDto,
  SignInDto, SignOutDto, TokenRefreshDto, UserCheck, UserSession
} from '@/src/entities';
import { Api } from '@/src/utils';

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

  static async tokenRefresh(
    tokenRefreshDto: TokenRefreshDto
  ) {
    const { data, } = await Api.post<UserSession, TokenRefreshDto>(
      '/auth/refresh',
      tokenRefreshDto
    );

    return data;
  }

  static async userCheck(userCheckDto: UserCheck) {
    const { data, } = await Api.post<null, UserCheck>(
      '/auth/reset',
      userCheckDto
    );

    return data;
  }

  static async resetPassword(
    resetPasswordDto: ResetPasswordDto
  ) {
    const { data, } = await Api.post<null, ResetPasswordDto>(
      '/auth/reset/password',
      resetPasswordDto
    );

    return data;
  }
}
