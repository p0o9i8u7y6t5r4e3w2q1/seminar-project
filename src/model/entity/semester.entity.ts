import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DateUtil } from '../../util';

@Entity('semester')
export class Semester {
  @PrimaryColumn('tinyint', { name: 'year' })
  year: number;

  @PrimaryColumn('tinyint', {
    width: 1,
    name: 'semester',
  })
  semester: number;

  @Column('date', { name: 'start_date' })
  semesterStartDate: Date;

  @Column('date', { name: 'end_date' })
  semesterEndDate: Date;

  @Column('date', { name: 'cou_start_date' })
  courseStartDate: Date;

  @Column('date', { name: 'cou_end_date' })
  courseEndDate: Date;

  constructor(init?: Partial<Semester>) {
    Object.assign(this, init);
  }

  /* ---- other function ---- */
  /**
   * 確認日期是否在一般上課日期內
   * @param date
   * @return
   */
  public isInCourseDate(date: Date): boolean {
    return DateUtil.isDateInRange(
      date,
      this.courseStartDate,
      this.courseEndDate,
    );
  }

  /**
   * 確認日期是否在學期範圍內
   * @param date
   * @return
   */
  public isInSemester(date: Date): boolean {
    return DateUtil.isDateInRange(
      date,
      this.semesterStartDate,
      this.semesterEndDate,
    );
  }
}
