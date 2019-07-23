import { ManyToMany, JoinTable, RelationId } from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Student } from './student.entity';

export class TA extends Student {
  @ManyToMany(type => SemesterCourse, { nullable: true })
  @JoinTable({
    name: 'ta',
    joinColumn: { name: 'stud_id' },
    inverseJoinColumn: { name: 'sc_id' },
  })
  private _semesterCourses: SemesterCourse[];

  @RelationId((ta: TA) => ta._semesterCourses)
  private _semesterCourseIDs: string[];

  public get semesterCourses() {
    return this._semesterCourses;
  }

  public set semesterCourses(semesterCourses: SemesterCourse[]) {
    this._semesterCourses = semesterCourses;
  }

  public get semesterCourseIDs() {
    return this._semesterCourseIDs;
  }

  /* XXX typorm 不提供，但可以做測試
  public set semesterCourseIDs(semesterCourseIDs:string[]) {
     this._semesterCourseIDs = semesterCourseIDs;
  }
   */
}
