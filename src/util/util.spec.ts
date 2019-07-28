import { ScheduleUtil } from './schedule-util';
import { Schedule } from '../model/entity';
import { DateUtil } from './date-util';
import { StringUtil } from './string-util';

describe('ScheduleUtil', () => {
  const sched1: Schedule = new Schedule(1, '2', '61101', '1072H3457');
  const sched2: Schedule = new Schedule(1, '3', '61101', '1072H3457');
  const sched3: Schedule = new Schedule(3, '2', '61101', '1072H3457');

  test('compareSchedules', () => {
    function sortTest(array: Schedule[], answer: Schedule[]) {
      const copyArray = array.slice();
      copyArray.sort(ScheduleUtil.compareSchedules);
      expect(copyArray).toEqual(answer);
    }

    const result: Schedule[] = [sched1, sched2, sched3];
    sortTest([sched3, sched2, sched1], result);
    sortTest([sched1, sched2, sched3], result);
    sortTest([sched2, sched3, sched1], result);
  });

  test('schedulesToString', () => {
    expect(
      ScheduleUtil.schedulesToString([
        new Schedule(2, 'B', null, null),
        new Schedule(2, 'C', null, null),
        new Schedule(2, 'D', null, null),
      ]),
    ).toBe('[2]B-D');

    expect(ScheduleUtil.schedulesToString([sched1, sched2, sched3])).toBe(
      '[1]2-3,[3]2',
    );
  });

  test('parseSchedules', () => {
    expect(
      ScheduleUtil.parseSchedules('[1]2-3,[3]2', '61101', '1072H3457'),
    ).toEqual([sched1, sched2, sched3]);

    expect(ScheduleUtil.parseSchedules('[2]B-D', '61101', '1072H3457')).toEqual(
      [
        new Schedule(2, 'B', '61101', '1072H3457'),
        new Schedule(2, 'C', '61101', '1072H3457'),
        new Schedule(2, 'D', '61101', '1072H3457'),
      ],
    );
  });
});

describe('DateUtil', () => {
  test('getPeriod', () => {
    const date = new Date();
    date.setMinutes(35);

    date.setHours(3);
    expect(DateUtil.getPeriod(date)).toBe(null);

    date.setHours(10);
    expect(DateUtil.getPeriod(date)).toBe('3');

    date.setHours(12);
    expect(DateUtil.getPeriod(date)).toBe('N');

    date.setHours(23);
    expect(DateUtil.getPeriod(date)).toBe(null);
  });
});

describe('StringUtil', () => {
  test('prefixZero', () => {
    expect(StringUtil.prefixZero(7, 3)).toBe('007');
    expect(StringUtil.prefixZero(115, 3)).toBe('115');
    expect(StringUtil.prefixZero(2, 6)).toBe('000002');
  });
});
