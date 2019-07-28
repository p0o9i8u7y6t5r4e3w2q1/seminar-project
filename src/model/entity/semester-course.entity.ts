import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Course } from './course.entity';
import { Teacher } from './teacher.entity';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';
import { Student } from './student.entity';
import { StringUtil } from '../../util';

@Entity('semester_course')
export class SemesterCourse {
  private _id: string;

  private _course: Course;

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

  private _schedules: Schedule[];

  // 課程時間
  private _time: string;

  private _teacher: Teacher;

  private _teacherID: string;

  private _classroom: Classroom;

  private _classroomID: string;

  private _students: Student[];

  /* ---- settter and getter ---- */
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }

  @ManyToOne(type => Course, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'cou_id', referencedColumnName: 'id' })
  public get course() {
    return this._course;
  }
  public set course(course: Course) {
    this._course = course;
  }

  @Column('char', {
    length: 7,
    name: 'cou_id',
  })
  public get courseID() {
    return this._courseID;
  }
  public set courseID(courseID: string) {
    this._courseID = courseID;
  }

  @Column('tinyint', { name: 'year' })
  public get year() {
    return this._year;
  }
  public set year(year: number) {
    this._year = year;
  }

  @Column('tinyint', { name: 'semester' })
  public get semester() {
    return this._semester;
  }
  public set semester(semester: number) {
    this._semester = semester;
  }

  @Column('char', { length: 2, name: 'dept' })
  public get dept() {
    return this._dept;
  }
  public set dept(dept: string) {
    this._dept = dept;
  }

  @Column('smallint', { name: 'serial' })
  public get serial() {
    return this._serial;
  }
  public set serial(serial: number) {
    this._serial = serial;
  }

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'time',
  })
  public get time() {
    return this._time;
  }
  public set time(time: string) {
    this._time = time;
  }

  @OneToMany(type => Schedule, schedule => schedule.semesterCourse, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  public get schedules() {
    return this._schedules;
  }
  public set schedules(schedules: Schedule[]) {
    this._schedules = schedules;
  }

  @ManyToOne(type => Teacher, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'tch_id', referencedColumnName: 'id' })
  public get teacher() {
    return this._teacher;
  }
  public set teacher(teacher: Teacher) {
    this._teacher = teacher;
  }

  @Column('char', {
    length: 8,
    name: 'tch_id',
  })
  public get teacherID() {
    return this._teacherID;
  }
  public set teacherID(teacherID: string) {
    this._teacherID = teacherID;
  }

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  public get classroom() {
    return this._classroom;
  }
  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @ManyToMany(type => Student, { nullable: false })
  @JoinTable({
    name: 'enrollment',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  public get students() {
    return this._students;
  }
  public set students(students: Student[]) {
    this._students = students;
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  splitID() {
    this._year = Number(this._id.slice(0, 3));
    this._semester = Number(this._id.charAt(3));
    this._dept = this._id.slice(4, 6);
    this._serial = Number(this._id.slice(6, 9));
  }

  @BeforeInsert()
  @BeforeUpdate()
  combineID() {
    this._id =
      StringUtil.prefixZero(this._year, 3) +
      this._semester +
      this._dept +
      StringUtil.prefixZero(this._serial, 3);
  }
}
