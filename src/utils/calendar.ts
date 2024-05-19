import { Nihil } from '@/src/utils';
import {
  CalendarMonthData, CalendarTime, CalendarTimeData, MonthData
} from '@/src/entities';

export class Calendar {
  static getNowDate() {
    const { year, month, date, } = Nihil.getDateInfo();

    return `${year}-${month}-${date}`;
  }

  static monthData(date?: string | number | Date): MonthData {
    const initDate = Nihil.getDateInfo(date);

    let dateData = Nihil.getDateInfo(`${initDate.year}-${initDate.month}-01`);
    const nowDate = `${initDate.year}-${initDate.month}-${initDate.date}`;
    const nowTime = `${initDate.hour}:${initDate.minute}`;

    return {
      nowDate,
      nowTime,
      now: `${dateData.year}-${dateData.month}`,
      prev: `${dateData.prevYear}-${dateData.prevMonth}`,
      next: `${dateData.nextYear}-${dateData.nextMonth}`,
    };
  }

  static monthArray(date?: string | number | Date) {
    const monthData = this.monthData(date);

    let dateData = Nihil.getDateInfo(`${monthData.now}-01`);

    const monthStartDay = dateData.day;
    const monthEndDate = dateData.endDate;

    const prevDateData = Nihil.getDateInfo(`${dateData.prevYear}-${dateData.prevMonth}`);

    const prevMonthEndDate = prevDateData.endDate;

    const dateOfMonth: CalendarMonthData[] = [];

    for (let i = monthStartDay; i > 0; i--) {
      const nowDate = +prevMonthEndDate - i + 1 < 10
        ? `0${+prevMonthEndDate - i + 1}`
        : (+prevMonthEndDate - i + 1).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.prevYear}-${dateData.prevMonth}-${nowDate}`,
        isActive: false,
      });
    }

    for (let i = 1; i <= +monthEndDate; i++) {
      const nowDate = i < 10
        ? `0${i}`
        : (i).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.year}-${dateData.month}-${nowDate}`,
        isActive: true,
      });
    }

    for (let i = dateOfMonth.length, n = 1; i < 42; i++, n++) {
      const nowDate = n < 10
        ? `0${n}`
        : (n).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.nextYear}-${dateData.nextMonth}-${nowDate}`,
        isActive: false,
      });
    }

    return Nihil.arraySlice<CalendarMonthData>(dateOfMonth, 7);
  }

  static timeData(): CalendarTime {
    const hours: CalendarTimeData[] = new Array(24)
      .fill(0)
      .map((item: number, index) => {
        const value = (item + index) < 10 ? `0${item + index}` : (item + index).toString();

        return {
          value,
          label: `${value}시`,
        };
      });

    const minutes: CalendarTimeData[] = new Array(61)
      .fill(0)
      .map((item: number, index) => {
        const value = (item + index) < 10 ? `0${item + index}` : (item + index).toString();

        return {
          value,
          label: `${value}분`,
        };
      });

    return {
      hours,
      minutes,
    };
  }
}
