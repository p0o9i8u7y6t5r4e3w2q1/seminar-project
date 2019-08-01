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
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  id: string;

  @ManyToOne(type => Course, {
    cascade: ['insert', 'update'],
    nullable: false,
  })
  @JoinColumn({ name: 'cou_id' })
  course: Course;

  @Column('char', {
    length: 7,
    name: 'cou_id',
  })
  courseID: string;

  @Column('tinyint', { name: 'year' })
  year: number;

  @Column('tinyint', { name: 'semester' })
  semester: number;

  // 開課系所
  @Column('char', { length: 2, name: 'dept' })
  dept: string;

  // 開課序號
  @Column('smallint', { name: 'serial' })
  serial: number;

  @OneToMany(type => Schedule, schedule => schedule.semesterCourse)
  schedules: Schedule[];

  // 課程時間
  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'time',
  })
  time: string;

  @ManyToOne(type => Teacher, { nullable: true })
  @JoinColumn({ name: 'tch_id' })
  teacher: Teacher;

  @Column('char', {
    length: 8,
    nullable: true,
    name: 'tch_id',
  })
  teacherID: string;

  @ManyToOne(type => Classroom, {
    nullable: true,
  })
  @JoinColumn({ name: 'room_id' })
  classroom: Classroom;

  @Column('char', {
    length: 5,
    nullable: true,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToMany(type => Student, {
    cascade: ['insert', 'update'],
    nullable: false,
  })
  @JoinTable({
    name: 'enrollment',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  students: Student[];

  constructor(init?: Partial<SemesterCourse>) {
    Object.assign(this, init);
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  splitID() {
    this.year = Number(this.id.slice(0, 3));
    this.semester = Number(this.id.charAt(3));
    this.dept = this.id.slice(4, 6);
    this.serial = Number(this.id.slice(6, 9));
  }

  @BeforeInsert()
  @BeforeUpdate()
  combineID() {
    this.id =
      StringUtil.prefixZero(this.year, 3) +
      this.semester +
      this.dept +
      StringUtil.prefixZero(this.serial, 3);
  }
}
