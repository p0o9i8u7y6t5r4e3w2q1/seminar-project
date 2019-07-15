import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SemesterCourse {
  @PrimaryColumn()
  id: string;

  @Column()
  courseID: string;

  @Column()
  year: number;

  @Column()
  semester: number;

  /**
   * 開課系所
   */
  @Column()
  dept: string;

  /**
   * 開課序號
   */
  @Column()
  serial: number;

  /**
   * 課程時間
   */
  @Column()
  time: string;

  @Column()
  teacherID: string;

  @Column()
  classroomID: string;

  @Column()
  roomID: string;

  public getID(): string {
    return this.id;
  }

  public setID(id: string): void {
    this.id = id;
  }

  public getCourseID(): string {
    return this.courseID;
  }

  public setCourseID(courseID: string): void {
    this.courseID = courseID;
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

  public getDept(): string {
    return this.dept;
  }

  public setDept(dept: string): void {
    this.dept = dept;
  }

  public getSerial(): number {
    return this.serial;
  }

  public setSerial(serial: number): void {
    this.serial = serial;
  }

  public getTime(): string {
    return this.time;
  }

  public setTime(time: string): void {
    this.time = time;
  }

  public getTeacherID(): string {
    return this.teacherID;
  }

  public setTeacherID(teacherID: string): void {
    this.teacherID = teacherID;
  }

  public getClassroomID(): string {
    return this.classroomID;
  }

  public setClassroomID(classroomID: string): void {
    this.classroomID = classroomID;
  }

  public getRoomID(): string {
    return this.roomID;
  }

  public setRoomID(roomID: string): void {
    this.roomID = roomID;
  }
}
