import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('semester')
export class Semester {
  @PrimaryColumn('tinyint', { name: 'year' })
  private _year: number;

  @PrimaryColumn('tinyint', {
    width: 1,
    name: 'semester',
  })
  private _semester: number;

  @Column('date', { name: 'start_date' })
  private _semesterStartDate: Date;

  @Column('date', { name: 'end_date' })
  private _semesterEndDate: Date;

  @Column('date', { name: 'cou_start_date' })
  private _courseStartDate: Date;

  @Column('date', { name: 'cou_end_date' })
  private _courseEndDate: Date;

  /**
   * 確認日期是否在一般上課日期內
   * @param date
   * @return
   */
  public isInCourseDate(date: Date): boolean {
    // TODO implement here
    return null;
  }

  /**
   * 確認日期是否在學期範圍內
   * @param date
   * @return
   */
  public isInSemester(date: Date): boolean {
    // TODO implement here
    return null;
  }

  public get year() {
    return this._year;
  }

  public set year(year: number) {
    this._year = year;
  }

  public get semester() {
    return this._semester;
  }

  public setSemester(semester: number) {
    this._semester = semester;
  }

  public getSemesterStartDate() {
    return this._semesterStartDate;
  }

  public setSemesterStartDate(semStartDate: Date) {
    this._semesterStartDate = semStartDate;
  }

  public getSemesterEndDate() {
    return this._semesterEndDate;
  }

  public setSemesterEndDate(semEndDate: Date) {
    this._semesterEndDate = semEndDate;
  }

  public getCourseStartDate() {
    return this._courseStartDate;
  }

  public setCourseStartDate(courseStartDate: Date) {
    this._courseStartDate = courseStartDate;
  }

  public getCourseEndDate() {
    return this._courseEndDate;
  }

  public setCourseEndDate(courseEndDate: Date) {
    this._courseEndDate = courseEndDate;
  }
}
