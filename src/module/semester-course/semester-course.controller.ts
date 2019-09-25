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
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CrawlingService } from './crawling.service';
import { SemesterCourseService } from './semester-course.service';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType, DateUtil } from '../../util';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

// 還需要測試，考慮去掉console.log
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
  @ApiOperation({ title: '新增學期課程' })
  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async create(@Body() createSemesterCourseDto: CreateSemesterCourseDto) {
    return await this.semesterCourseService.create(createSemesterCourseDto);
  }

  /**
   * 查詢所有學期課程
   */
  @ApiOperation({ title: '查詢所有學期課程' })
  @ApiBearerAuth()
  @Get('findAll')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findAll(
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return await this.semesterCourseService.findAll(year, semester);
  }

  /**
   * 針對user的角色類別，查詢所有學期課程
   */
  @ApiOperation({
    title: '查詢角色所有學期課程',
    description: '針對user的角色類別，查詢有權限的學期課程',
  })
  @ApiBearerAuth()
  @Get('findOwn')
  @UseGuards(AuthenticatedGuard)
  async findByUser(@Req() req: Request) {
    const { year, semester } = DateUtil.getYearAndSemester(new Date());
    return await this.semesterCourseService.findByUser(
      req.user,
      year,
      semester,
    );
  }

  @ApiOperation({ title: '查詢指定學期課程' })
  @Get('findOne/:scID')
  async findSemesterCourse(@Param('scID') scID: string) {
    return await this.semesterCourseService.findOne(scID);
  }

  /**
   * 更新學期課程
   */
  @ApiOperation({ title: '更新學期課程' })
  @Put('update/:scID')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async update(
    @Param('scID') scID: string,
    @Body() updateDto: UpdateSemesterCourseDto,
  ) {
    return await this.semesterCourseService.update(scID, updateDto);
  }

  /**
   * 刪除一個學期課程
   */
  @ApiOperation({ title: '刪除學期課程' })
  @Delete('delete/:scID')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async delete(@Param('scID') scID: string) {
    return await this.semesterCourseService.delete(scID);
  }

  @ApiOperation({ title: '導入學期課程', description: '使用爬蟲導入學期課程' })
  @Get('import')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async importSemesterCourses() {
    return await this.crawlingService.importSemesterCourses();
  }
}
