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
import { TA } from './ta.entity';
import { StringUtil, ScheduleUtil } from '../../util';

@Entity('semester_course')
@Unique(['year', 'semester', 'courseID', 'courseNo'])
export class SemesterCourse {
  @PrimaryColumn('varchar', {
    length: 12,
    name: 'id',
  })
  id: string;

  @ManyToOne(() => Course, {
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

  @OneToMany(() => Schedule, schedule => schedule.semesterCourse, {
    cascade: ['insert', 'update'],
  })
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
  teacher: Teacher;

  @Column('char', {
    length: 8,
    nullable: true,
    name: 'tch_id',
  })
  teacherID: string;

  @ManyToOne(() => Classroom, { nullable: true })
  @JoinColumn({ name: 'room_id' })
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
  students: Student[];

  @ManyToMany(() => TA, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'sc_id' },
    inverseJoinColumn: { name: 'stud_id' },
  })
  TAs: TA[];

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

  /*
  @BeforeUpdate()
  @BeforeInsert()
  generateScheduels() {
    if (this.time != null) {
      this.schedules = ScheduleUtil.parseSchedules(
        this.time,
        this.year,
        this.semester,
        this.classroomID,
        this.id,
      );
      console.log(this.schedules);
    }
  }
     */
}
