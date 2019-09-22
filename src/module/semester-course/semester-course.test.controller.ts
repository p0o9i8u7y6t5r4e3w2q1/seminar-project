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
  ParseIntPipe,
} from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { SemesterCourseService } from './semester-course.service';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { RoleType, DateUtil } from '../../util';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('test')
@Controller('test/semester-course')
export class SemesterCourseTestController {
  constructor(
    @Inject(SemesterCourseService)
    private semesterCourseService: SemesterCourseService,
    @Inject(CrawlingService)
    private crawlingService: CrawlingService,
  ) {}

  /* ----------------------------------------*/
  /* test function */
  /* ---------------------------------------- */

  @Get('import')
  async importSemesterCoursesTest(
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return await this.crawlingService
      .importSemesterCourses(year, semester)
      .then(value => {
        return 'import success';
      });
  }

  @Post('create')
  async createTest(@Body() createSemesterCourseDto: CreateSemesterCourseDto) {
    return await this.semesterCourseService
      .create(createSemesterCourseDto)
      .catch(error => {
        console.error(Error);
      });
  }

  @Get('findAll')
  async findAllTest(
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

  @Get('findOwn')
  async findByUser(
    @Query('userID') userID: string,
    @Query('roleType', ParseIntPipe) roleType: number,
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return await this.semesterCourseService.findByUser(
      {
        id: userID,
        roleID: roleType,
      },
      year,
      semester,
    );
  }

  @Put('update/:id')
  async update(
    @Param('id') scID: string,
    @Body() updateDto: UpdateSemesterCourseDto,
  ) {
    return await this.semesterCourseService.update(scID, updateDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') scID: string) {
    return await this.semesterCourseService.delete(scID);
  }
}
