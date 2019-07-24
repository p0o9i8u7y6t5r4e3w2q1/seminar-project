import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('semester')
export class Semester {
  private _year: number;

  private _semester: number;

  private _semesterStartDate: Date;

  private _semesterEndDate: Date;

  private _courseStartDate: Date;

  private _courseEndDate: Date;

  /* ---- setter and gettter ---- */
  @PrimaryColumn('tinyint', { name: 'year' })
  public get year() {
    return this._year;
  }
  public set year(year: number) {
    this._year = year;
  }

  @PrimaryColumn('tinyint', {
    width: 1,
    name: 'semester',
  })
  public get semester() {
    return this._semester;
  }
  public setSemester(semester: number) {
    this._semester = semester;
  }

  @Column('date', { name: 'start_date' })
  public getSemesterStartDate() {
    return this._semesterStartDate;
  }
  public setSemesterStartDate(semStartDate: Date) {
    this._semesterStartDate = semStartDate;
  }

  @Column('date', { name: 'end_date' })
  public getSemesterEndDate() {
    return this._semesterEndDate;
  }
  public setSemesterEndDate(semEndDate: Date) {
    this._semesterEndDate = semEndDate;
  }

  @Column('date', { name: 'cou_start_date' })
  public getCourseStartDate() {
    return this._courseStartDate;
  }
  public setCourseStartDate(courseStartDate: Date) {
    this._courseStartDate = courseStartDate;
  }

  @Column('date', { name: 'cou_end_date' })
  public getCourseEndDate() {
    return this._courseEndDate;
  }
  public setCourseEndDate(courseEndDate: Date) {
    this._courseEndDate = courseEndDate;
  }

  /* ---- other function ---- */
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
}
