import { Column, PrimaryColumn } from 'typeorm';

export class Semester {
  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  semester: number;

  @Column()
  semStartDate: Date;

  @Column()
  semEndDate: Date;

  @Column()
  courseStartDate: Date;

  @Column()
  courseEndDate: Date;

  /**
   * 確認日期是否在一般上課日期內
   * @param date
   * @return
   */
  isInCourseDay(date: Date): boolean {
    // TODO implement here
    return null;
  }

  /**
   * 確認日期是否在學期範圍內
   * @param date
   * @return
   */
  isInSemester(date: Date): boolean {
    // TODO implement here
    return null;
  }

  public getYear(): number {
    return this.year;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public getSemester(): number {
    return this.semester;
  }

  public setSemester(semester: number): void {
    this.semester = semester;
  }

  public getSemStartDate(): Date {
    return this.semStartDate;
  }

  public setSemStartDate(semStartDate: Date): void {
    this.semStartDate = semStartDate;
  }

  public getSemEndDate(): Date {
    return this.semEndDate;
  }

  public setSemEndDDate(semEndDDate: Date): void {
    this.semEndDate = semEndDDate;
  }

  public getCourseStartDate(): Date {
    return this.courseStartDate;
  }

  public setCourseStartDate(courseStartDate: Date): void {
    this.courseStartDate = courseStartDate;
  }

  public getCourseEndDate(): Date {
    return this.courseEndDate;
  }

  public setCourseEndDate(courseEndDate: Date): void {
    this.courseEndDate = courseEndDate;
  }
}
