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
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

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

  @ApiOperation({ title: '導入學期課程', description: '使用爬蟲導入學期課程' })
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

  @ApiOperation({ title: '新增學期課程' })
  @Post('create')
  async createTest(@Body() createSemesterCourseDto: CreateSemesterCourseDto) {
    return await this.semesterCourseService
      .create(createSemesterCourseDto)
      .catch(error => {
        console.error(Error);
      });
  }

  @ApiOperation({ title: '查詢所有學期課程' })
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

  @ApiOperation({
    title: '查詢角色所有學期課程',
    description: '針對user的角色類別，查詢有權限的學期課程',
  })
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

  @ApiOperation({ title: '更新學期課程' })
  @Put('update/:scID')
  async update(
    @Param('scID') scID: string,
    @Body() updateDto: UpdateSemesterCourseDto,
  ) {
    return await this.semesterCourseService.update(scID, updateDto);
  }

  @ApiOperation({ title: '刪除學期課程' })
  @Delete('delete/:scID')
  async delete(@Param('scID') scID: string) {
    return await this.semesterCourseService.delete(scID);
  }
}
