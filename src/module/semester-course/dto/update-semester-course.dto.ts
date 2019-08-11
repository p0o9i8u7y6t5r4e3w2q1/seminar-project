import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Matches, IsNotEmpty } from 'class-validator';
import { TimeRegExp } from '../../../util';

export class UpdateSemesterCourseDto {
  // @Matches(TimeRegExp)
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  time?: string;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  classroomID?: string;
}
