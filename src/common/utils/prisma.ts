import { PrismaClient } from '@prisma/client';

export class Db {
  static client() {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
      }
      prisma = globalWithPrisma.prisma;
    }

    return prisma;
  }

  static masters() {
    return this.client().master;
  }

  static users() {
    return this.client().user;
  }

  static auth() {
    return this.client().auth;
  }

  static campains() {
    return this.client().campain;
  }

  static sessions() {
    return this.client().session;
  }

  static pcs() {
    return this.client().pc;
  }

  static blocks() {
    return this.client().editBlock;
  }
}
