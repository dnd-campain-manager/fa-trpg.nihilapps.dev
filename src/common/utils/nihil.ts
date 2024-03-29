import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import { toast } from 'react-toastify';
import { hash, compare } from 'bcrypt';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale(ko);

type ToastProps = {
  text: string;
  type: ('info' | 'error' | 'success' | 'warning');
};

export class Nihil {
  static uuid() {
    return uuid();
  }

  static string(data: any) {
    return JSON.stringify(data);
  }

  static parse<T>(stringData: string): T {
    return JSON.parse(stringData);
  }

  static date(date?: (string | number | Date)) {
    return dayjs(date || new Date()).tz('Asia/Seoul');
  }

  static dateToFormat(date?: (string | number | Date)) {
    return this.date(date).format('YYYY.M.D. HH:mm');
  }

  static toast({ type, text, }: ToastProps) {
    return toast(text, {
      type,
    });
  }

  static hash(data: string) {
    return hash(data, 10);
  }

  static compare(data: string, target: string) {
    return compare(data, target);
  }
}
