import { ExtendedCampain, UserSession } from '@/src/entities';

export class Auth {
  static isSignIn(loading: boolean, fetching: boolean) {
    return !loading && !fetching;
  }

  static findMainMaster(campain: ExtendedCampain) {
    const masters = campain.Master;

    return masters.find((item) => (
      item.masterType === 'mainMaster'
    ));
  }

  static findSubMaster(campain: ExtendedCampain) {
    const masters = campain.Master;

    return masters.filter((item) => (
      item.masterType === 'subMaster'
    ));
  }

  static isMainMaster(
    campain: ExtendedCampain,
    session: UserSession
  ) {
    if (!session) {
      return false;
    }

    const mainMaster = this.findMainMaster(campain);

    const isMainMaster = session.userId === mainMaster.User.id;

    return isMainMaster;
  }

  static isSubMaster(
    campain: ExtendedCampain,
    session: UserSession
  ) {
    if (!session) {
      return false;
    }

    const subMasters = this.findSubMaster(campain);

    const subMaster = subMasters.find((master) => (
      master.User.id === session.userId
    ));

    return !!subMaster;
  }

  static isAdmin(
    session: UserSession
  ) {
    if (!session) {
      return false;
    }

    return session?.userRole === 'admin';
  }
}
