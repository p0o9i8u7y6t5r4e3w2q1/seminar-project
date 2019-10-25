import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { IsValidId } from '../../shared';
import { Classroom, Teacher } from '../../../model/entity';

export class UpdateSemesterCourseDto {
  // @Matches(TimeRegExp)
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  time?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsValidId(Classroom)
  classroomID?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsValidId(Teacher)
  teacherID?: string;
}
