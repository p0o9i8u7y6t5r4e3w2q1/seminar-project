import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DateUtil } from '../../util';
import { dateTransformer } from '../transformer/date.transformer';

@Entity('semester')
export class Semester {
  @PrimaryColumn('tinyint', { name: 'year' })
  year: number;

  @PrimaryColumn('tinyint', {
    width: 1,
    name: 'semester',
  })
  semester: number;

  @Column('date', { name: 'start_date', transformer: [dateTransformer] })
  semesterStartDate: Date;

  @Column('date', { name: 'end_date', transformer: [dateTransformer] })
  semesterEndDate: Date;

  @Column('date', { name: 'cou_start_date', transformer: [dateTransformer] })
  courseStartDate: Date;

  @Column('date', { name: 'cou_end_date', transformer: [dateTransformer] })
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

  makeDefaultDates() {
    if (!this.year || !this.semester) return;

    if (!this.semesterStartDate) {
      if (this.semester === 1) {
        const y = this.year + 1911;
        this.semesterStartDate = new Date('' + y + '-08-01');
      } else {
        // semester == 2
        const y = this.year + 1912;
        this.semesterStartDate = new Date('' + y + '-02-01');
      }
    }
    if (!this.semesterEndDate) {
      if (this.semester === 1) {
        const y = this.year + 1911;
        this.semesterStartDate = new Date('' + y + '-01-31');
      } else {
        // semester == 2
        const y = this.year + 1912;
        this.semesterStartDate = new Date('' + y + '-07-31');
      }
    }
    if (!this.courseStartDate) {
      if (this.semester === 1) {
        const y = this.year + 1911;
        this.semesterStartDate = new Date('' + y + '-09-01');
      } else {
        // semester == 2
        const y = this.year + 1912;
        this.semesterStartDate = new Date('' + y + '-02-01');
      }
    }
    if (!this.courseEndDate) {
      if (this.semester === 1) {
        const y = this.year + 1911;
        this.semesterStartDate = new Date('' + y + '-01-31');
      } else {
        // semester == 2
        const y = this.year + 1912;
        this.semesterStartDate = new Date('' + y + '-06-31');
      }
    }
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
