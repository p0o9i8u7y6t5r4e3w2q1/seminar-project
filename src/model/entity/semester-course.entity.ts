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
import { Exclude, Expose, Transform } from 'class-transformer';
import { Course } from './course.entity';
import { Teacher } from './teacher.entity';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';
import { Student } from './student.entity';
import { TA } from './ta.entity';
import { StringUtil, ScheduleUtil } from '../../util';

@Entity('semester_course')
// @Unique(['year', 'semester', 'courseID', 'courseNo'])
export class SemesterCourse {
  @PrimaryColumn('varchar', {
    length: 12,
    name: 'id',
  })
  id: string;

  @ManyToOne(() => Course, {
    cascade: ['insert', 'update'],
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'cou_id' })
  @Transform(course => course.name)
  @Expose({ name: 'name' })
  course: Course;

  @Column('tinyint', { name: 'year' })
  @Exclude()
  year: number;

  @Column('tinyint', { name: 'semester' })
  @Exclude()
  semester: number;

  @Column('char', {
    length: 7,
    name: 'cou_id',
  })
  @Exclude()
  courseID: string;

  @Column('varchar', { length: 1, name: 'cou_no' })
  @Exclude()
  courseNo: string;

  @OneToMany(() => Schedule, schedule => schedule.semesterCourse, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  @Exclude()
  schedules: Schedule[];

  // 課程時間
  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'time',
  })
  time: string;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'tch_id' })
  @Exclude()
  teacher: Teacher;

  @Column('char', {
    length: 8,
    nullable: true,
    name: 'tch_id',
  })
  teacherID: string;

  @ManyToOne(() => Classroom, { nullable: true })
  @JoinColumn({ name: 'room_id' })
  @Exclude()
  classroom: Classroom;

  @Column('char', {
    length: 5,
    nullable: true,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToMany(() => Student, {
    cascade: ['insert', 'update'],
    nullable: false,
  })
  @JoinTable({
    name: 'enrollment',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  @Exclude()
  students: Student[];

  @ManyToMany(() => TA, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  @Exclude()
  TAs: TA[];

  constructor(init?: Partial<SemesterCourse>) {
    Object.assign(this, init);
  }

  /* ---- listener in typeorm ---- */
  // 加了下面兩個也不會正確保存但保留，自定義Repository也會呼叫
  @BeforeUpdate()
  @BeforeInsert()
  combineID() {
    // check if can combine id or not
    if (
      this.year == null ||
      this.semester == null ||
      this.courseID == null ||
      this.courseNo == null
    ) {
      return;
    }

    // combine id
    this.id =
      StringUtil.prefixZero(this.year, 3) +
      this.semester +
      this.courseID +
      this.courseNo;
  }

  // 加了下面兩個也不會正確保存但保留，自定義Repository也會呼叫
  @BeforeUpdate()
  @BeforeInsert()
  generateSchedules() {
    if (this.time != null && this.id != null) {
      this.schedules = ScheduleUtil.parseSchedules(
        this.time,
        this.year,
        this.semester,
        this.classroomID,
        this.id,
      );
    }
  }
}
