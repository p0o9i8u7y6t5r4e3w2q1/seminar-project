import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { SemesterCourseService } from './semester-course.service';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse } from '../../model/entity';
import { ApiUseTags } from '@nestjs/swagger';

// XXX 修改create參數，還需要測試，考慮去掉console.log
@ApiUseTags('semester course')
@Controller('semester-course')
export class SemesterCourseController {
  constructor(
    @Inject(SemesterCourseService)
    private semesterCourseService: SemesterCourseService,
    @Inject(CrawlingService)
    private crawlingService: CrawlingService,
  ) {}

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
   * 針對user的角色類別，查詢所偶學期課程
   */
  @Get('findOwn/:userID')
  async findByUser(@Param('userID') userID: string) {
    return await this.semesterCourseService.findByUser(userID);
  }

  /**
   * 更新學期課程
   */
  @Put('update/:id')
  async update(
    @Param('id') scID: string,
    @Body() updateDto: UpdateSemesterCourseDto,
  ) {
    return this.semesterCourseService
      .update(scID, updateDto)
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
    return await this.semesterCourseService
      .delete(scID)
      .then(value => {
        console.log('delete success');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }

  @Get('import')
  async importSemesterCourses() {
    return await this.crawlingService.importSemesterCourses().then(value => {
      return 'import success';
    });
  }
}
