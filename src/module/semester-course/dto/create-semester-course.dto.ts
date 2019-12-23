import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, Length, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Teacher, Classroom, SemesterCourse } from '../../../model/entity';
import { IsValidId, IdNotExists } from '../../shared';
import { IsCourseValid } from '../decorator/course-constraint.decorator';

export class CreateSemesterCourseDto {
  @ApiModelProperty()
  @Min(100)
  @Type(() => Number)
  readonly year: number;

  @ApiModelProperty()
  @IsIn([1, 2])
  @Type(() => Number)
  readonly semester: number;

  @ApiModelProperty()
  @Length(7, 7)
  @IsCourseValid('courseName')
  readonly courseID: string;

  @ApiModelProperty()
  @Length(0, 1)
  readonly courseNo: string;

  @ApiModelPropertyOptional()
  readonly courseName?: string;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly time?: string;

  @ApiModelPropertyOptional()
  @Length(8, 8)
  @IsOptional()
  @IsValidId(Teacher)
  readonly teacherID?: string;

  @ApiModelPropertyOptional()
  @Length(5, 5)
  @IsOptional()
  @IsValidId(Classroom)
  readonly classroomID?: string;

  @IdNotExists(SemesterCourse)
  get scID() {
    return `${this.year}${this.semester}${this.courseID}${this.courseNo}`;
  }
}
