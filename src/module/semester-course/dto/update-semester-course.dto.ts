import { IsNotEmpty, Matches } from 'class-validator';
import { ClassroomIDRegExp } from '../../../util';

export class UpdateSemesterCourseDto {
  @IsNotEmpty()
  time: string;

  @Matches(ClassroomIDRegExp)
  classroomID: string;
}
