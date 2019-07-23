import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from './course.entity';
import { Teacher } from './teacher.entity';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';
import { Student } from './student.entity';

@Entity('semester_course')
export class SemesterCourse {
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  private _id: string;

  @ManyToOne(type => Course, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'cou_id' })
  private _course: Course;

  @RelationId((semesterCourse: SemesterCourse) => semesterCourse._course)
  private _courseID: string;

  private _year: number;

  private _semester: number;

  /**
   * 開課系所
   */
  private _dept: string;

  /**
   * 開課序號
   */
  private _serial: number;

  @OneToMany(type => Schedule, schedule => schedule.semesterCourse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  private _schedules: Schedule[];

  /**
   * 課程時間
   */
  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'time',
  })
  private _time: string;

  @ManyToOne(type => Teacher, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'tch_id' })
  private _teacher: Teacher | null;

  @RelationId((semesterCourse: SemesterCourse) => semesterCourse._teacher)
  private _teacherID: string;

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  private _classroom: Classroom;

  @RelationId((semesterCourse: SemesterCourse) => semesterCourse._classroom)
  private _classroomID: string;

  @ManyToMany(type => Student, { nullable: false })
  @JoinTable({
    name: 'enrollment',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  private _students: Student[];

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get classroom() {
    return this._classroom;
  }

  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  public get courseID() {
    return this._courseID;
  }

  public set courseID(courseID: string) {
    this._courseID = courseID;
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

  public set semester(semester: number) {
    this._semester = semester;
  }

  public get dept() {
    return this._dept;
  }

  public set dept(dept: string) {
    this._dept = dept;
  }

  public get serial() {
    return this._serial;
  }

  public set serial(serial: number) {
    this._serial = serial;
  }

  public get time() {
    return this._time;
  }

  public set time(time: string) {
    this._time = time;
  }

  public get schedules() {
    return this._schedules;
  }

  public set schedules(schedules: Schedule[]) {
    this._schedules = schedules;
  }

  public get teacher() {
    return this._teacher;
  }

  public set teacher(teacher: Teacher) {
    this._teacher = teacher;
  }

  public get teacherID() {
    return this._teacherID;
  }

  public set teacherID(teacherID: string) {
    this._teacherID = teacherID;
  }

  public get classroomID() {
    return this._classroomID;
  }

  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  public get students() {
    return this._students;
  }

  public set students(students: Student[]) {
    this._students = students;
  }
}
