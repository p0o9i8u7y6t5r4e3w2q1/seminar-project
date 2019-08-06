import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Matches, IsNotEmpty, IsString } from 'class-validator';
import { TimeRegExp } from '../../../util';

export class UpdateSemesterCourseDto {
  // @Matches(TimeRegExp)
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  time: string;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  classroomID: string;
}
