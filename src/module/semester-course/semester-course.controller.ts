import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SemesterCourseService } from './semester-course.service';
import { SemesterCourse } from '../../model/entity';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';

// XXX 修改create參數，還需要測試，考慮去掉console.log
@Controller('semester-course')
export class SemesterCourseController {
  constructor(private semesterCourseService: SemesterCourseService) {}
  /**
   * 新增學期課程
   */
  @Post('create')
  async create(@Body() createSemesterCourseDto: CreateSemesterCourseDto) {
    return await this.semesterCourseService
      .create(createSemesterCourseDto)
      .catch(error => {
        console.error(Error);
      });
  }

  /**
   * 查詢所偶學期課程
   */
  @Get('findAll')
  async findAll(
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return await this.semesterCourseService
      .findAll(year, semester)
      .then(value => {
        console.log('findAll success');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }

  /**
   * 更新學期課程
   */
  @Put('update/:id')
  async update(
    @Param('id') scID: string,
    @Body() updateSemesterCourseDto: UpdateSemesterCourseDto,
  ) {
    return this.semesterCourseService
      .update(scID, updateSemesterCourseDto)
      .then(value => {
        console.log('update success');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }

  /**
   * 刪除一個學期課程
   */
  @Delete('delete/:id')
  async delete(@Param('id') scID: string) {
    return this.semesterCourseService
      .delete(scID)
      .then(value => {
        console.log('delete success');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }
}
