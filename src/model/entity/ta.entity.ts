import { ManyToMany, JoinTable, RelationId, Entity } from 'typeorm';
import { Student } from './student.entity';
import { SemesterCourse } from './semester-course.entity';

@Entity('student')
export class TA extends Student {
  private _semesterCourses: SemesterCourse[];

  private _semesterCourseIDs: string[];

  @ManyToMany(type => SemesterCourse, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'stud_id' },
    inverseJoinColumn: { name: 'sc_id' },
  })
  public get semesterCourses() {
    return this._semesterCourses;
  }
  public set semesterCourses(semesterCourses: SemesterCourse[]) {
    this._semesterCourses = semesterCourses;
  }

  @RelationId((ta: TA) => ta.semesterCourses)
  public get semesterCourseIDs() {
    return this._semesterCourseIDs;
  }
  public set semesterCourseIDs(semesterCourseIDs: string[]) {
    this._semesterCourseIDs = semesterCourseIDs;
  }
}
