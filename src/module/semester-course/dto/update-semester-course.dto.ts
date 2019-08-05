import { Matches, IsString } from 'class-validator';
import { TimeRegExp } from '../../../util';

export class UpdateSemesterCourseDto {
  @Matches(TimeRegExp)
  @IsString()
  time: string;

  @IsString()
  classroomID: string;
}
