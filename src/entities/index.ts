// 이 폴더에서는 데이터만을 다룬다. 데이터의 타이핑이나 데이터 그 자체를 여기에 넣어둔다. prisma 등등.

export {
  type ApiResponse,
  type IConfigData,
  type ISiteMeta,
  type ApiError
} from './common/common.types';

export {
  commonStore,
  setDarkMode
} from './common/common.store';

export {
  type CreateUserDto,
  type UpdateUserDto,
  type ExtendedUser,
  type ExtendedUserMaster,
  type ExtendedUserPc,
  type UserData
} from './users/users.types';

export {
  type SignInDto,
  type TokenRefreshDto,
  type TokenInfo,
  type UserSession,
  type SignOutDto,
  type UserCheck,
  type ResetPasswordDto,
  type ChangePersonalDataDto
} from './auth/auth.types';
export { authStore } from './auth/auth.store';

export {
  type CreateCampainDto,
  type UpdateCampainDto,
  type ExtendedCampain,
  type CustomMaster,
  type ExtendedCampainPc,
  type CampainPages
} from './campains/campains.types';

export {
  type CreateSessionsDto,
  type UpdateSessionDto,
  type ExtendedSession
} from './sessions/sessions.types';

export {
  type CreateMasterDto,
  type UpdateMasterDto,
  type ExtendedMaster,
  type MasterPages
} from './masters/masters.types';

export {
  type ExtendedPc,
  type CreatePcDto,
  type UpdatePcDto
} from './pcs/pcs.types';
