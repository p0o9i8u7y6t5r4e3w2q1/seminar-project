import { ManyToMany, JoinTable, RelationId, Entity } from 'typeorm';
import { Student } from './student.entity';
import { SemesterCourse } from './semester-course.entity';

@Entity('student')
export class TA extends Student {
  @ManyToMany(() => SemesterCourse, sc => sc.TAs, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'stud_id' },
    inverseJoinColumn: { name: 'sc_id' },
  })
  semesterCourses: SemesterCourse[];

  @RelationId((ta: TA) => ta.semesterCourses)
  semesterCourseIDs: string[];

  constructor(init?: Partial<TA>) {
    super();
    Object.assign(this, init);
  }
}
