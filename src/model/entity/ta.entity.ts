import { ManyToMany, JoinTable, Entity } from 'typeorm';
import { Student } from './student.entity';
import { SemesterCourse } from './semester-course.entity';
import { Exclude } from 'class-transformer';

@Entity('student')
export class TA extends Student {
  @ManyToMany(() => SemesterCourse, sc => sc.TAs, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'stud_id' },
    inverseJoinColumn: { name: 'sc_id' },
  })
  @Exclude()
  semesterCourses: SemesterCourse[];

  constructor(init?: Partial<TA>) {
    super();
    Object.assign(this, init);
  }
}
