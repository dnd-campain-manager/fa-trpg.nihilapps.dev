import { Dayjs } from 'dayjs';
import { Nihil } from '@/src/common';

export class Calendar {
  static monthData(
    date?: (number | string | Date),
    number?: number
  ) {
    let dateData: Dayjs;

    if (number) {
      dateData = Nihil.date(date || new Date()).add(number, 'month');
    } else {
      dateData = Nihil.date(date || new Date());
    }

    const year = dateData.get('year');
    const month = dateData.get('month');

    const dateArray = this.getDateArray(year, month);

    return {
      year,
      month: month + 1,
      dates: dateArray,
    };
  }

  static getDateArray(
    year: number,
    month: number
  ) {
    const lastDate = Nihil.date(`${year}-${month + 1}-01`)
      .daysInMonth();

    return new Array(lastDate).fill(1).map((item, index) => {
      const currentDate = Nihil.date(`${year}-${month + 1}-${item + index}`);
      const day = currentDate.get('day');
      const date = currentDate.get('date');

      return {
        day,
        date,
      };
    });
  }
}
