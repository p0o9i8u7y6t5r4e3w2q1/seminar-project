import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  Unique,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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
@Unique(['year', 'semester', 'courseID', 'courseNo'])
export class SemesterCourse {
  @PrimaryColumn('varchar', {
    length: 12,
    name: 'id',
  })
  id: string;

  @ManyToOne(type => Course, {
    cascade: ['insert', 'update'],
    nullable: false,
  })
  @JoinColumn({ name: 'cou_id' })
  course: Course;

  @Column('tinyint', { name: 'year' })
  year: number;

  @Column('tinyint', { name: 'semester' })
  semester: number;

  @Column('char', {
    length: 7,
    name: 'cou_id',
  })
  courseID: string;

  @Column('varchar', { length: 1, name: 'cou_no' })
  courseNo: string;

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
  @BeforeUpdate()
  @BeforeInsert()
  combineID() {
    // check if can combine id or not
    if (
      this.year == null ||
      this.semester == null ||
      this.courseID == null ||
      this.courseNo == null
    )
      return;

    // combine id
    this.id =
      StringUtil.prefixZero(this.year, 3) +
      this.semester +
      this.courseID +
      this.courseNo;
  }
}
