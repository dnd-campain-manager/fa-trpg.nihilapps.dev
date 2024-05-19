import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import { toast } from 'react-toastify';
import { DateInfo } from '@/src/entities';

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
    return this.date(date).format('YYYY년 MM월 DD일');
  }

  static dateToTimeFormat(date?: (string | number | Date)) {
    return this.date(date).format('YYYY.M.D. HH:mm');
  }

  static UTCString(date?: (string | number | Date)) {
    return this.date(date).toISOString();
  }

  static getDateInfo(date?: (string | number | Date)): DateInfo {
    const year = this.date(date).get('year').toString();
    let month = this.date(date).get('month').toString();
    month = (+month + 1) < 10 ? `0${+month + 1}` : `${+month + 1}`;

    let nowDate = this.date(date).get('date').toString();
    nowDate = +nowDate < 10 ? `0${nowDate}` : nowDate;

    const day = this.date(date).get('day');

    const endDate = this
      .date(new Date(+year, +month, 0))
      .get('date').toString();

    const dayToString = {
      0: '일요일',
      1: '월요일',
      2: '화요일',
      3: '수요일',
      4: '목요일',
      5: '금요일',
      6: '토요일',
    };

    let hour = this.date(date).get('hour').toString();
    hour = +hour < 10 ? `0${hour}` : hour;

    let minute = this.date(date).get('minute').toString();
    minute = +minute < 10 ? `0${minute}` : minute;

    let prevMonth = this.date(date)
      .add(-1, 'month')
      .get('month').toString();
    prevMonth = (+prevMonth + 1) < 10 ? `0${+prevMonth + 1}` : `${+prevMonth + 1}`;

    let nextMonth = this.date(date)
      .add(1, 'month')
      .get('month').toString();
    nextMonth = (+nextMonth + 1) < 10 ? `0${+nextMonth + 1}` : `${+nextMonth + 1}`;

    let prevYear: string;
    let nextYear: string;

    if (month === '12') {
      prevYear = year;
      nextYear = (+year + 1).toString();
    } else if (month === '01') {
      prevYear = (+year - 1).toString();
      nextYear = year;
    } else {
      prevYear = year;
      nextYear = year;
    }

    return {
      year,
      prevYear,
      nextYear,
      month,
      prevMonth,
      nextMonth,
      date: nowDate,
      day,
      dayString: dayToString[day],
      hour,
      minute,
      endDate,
    };
  }

  static toast({ type, text, }: ToastProps) {
    return toast(text, {
      type,
    });
  }

  static undefinedToString<T>(data: T) {
    const copy = { ...data, };
    const keys = Object.keys(copy);

    keys.forEach((key) => {
      if (copy[key] === undefined) {
        copy[key] = '';
      }

      if (copy[key] === null) {
        copy[key] = '';
      }
    });

    return copy;
  }

  static hasNextPage(
    items: number,
    perPage: number,
    page: number,
    total: number
  ) {
    if (items === 0) {
      return false;
    }

    // perPage 를 꽉 채우는지 아닌지 결정함.
    let pageItems: number;
    if (perPage - items === 0) {
      pageItems = perPage;
    } else {
      pageItems = items;
    }

    let currentItems: number;

    if (page === 1) {
      // 페이지가 1일 경우 현재 아이템 개수
      currentItems = pageItems;
    } else {
      // 이전 페이지까지의 아이템 개수
      const prevItems = perPage * (page - 1);

      // 현재 페이지의 아이템 개수와 이전 페이지까지의 아이템 개수를 더함.
      currentItems = prevItems + pageItems;
    }

    // 현재 페이지까지의 아이템 개수와 총 아이템 개수를 뺀다.
    const diff = total - currentItems;

    return diff > 0;
  }

  static arraySlice<T>(array: T[], number: number) {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += number) {
      result.push(array.slice(i, i + number));
    }

    return result;
  }
}
