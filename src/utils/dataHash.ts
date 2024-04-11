import { compare, hash } from 'bcryptjs';

export class DataHash {
  static async hashData(data: string) {
    return hash(data, 10);
  }

  static async compareData(data: string, hashedData: string) {
    return compare(data, hashedData);
  }
}
