import userDataJSON from './user.data.json';
import { UserData } from '@/src/entities';

export { configData } from './config.data';
export {
  usersKeys,
  campainsKeys,
  sessionsKeys,
  pcsKeys
} from './keys.data';

export { classObj } from './class.data';
export { expData } from './exp.data';

const userData = userDataJSON as UserData[];

export { userData };
