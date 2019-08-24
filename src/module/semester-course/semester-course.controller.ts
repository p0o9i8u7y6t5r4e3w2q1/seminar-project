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
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async create(@Body() createSemesterCourseDto: CreateSemesterCourseDto) {
    return {
      result: await this.semesterCourseService.create(createSemesterCourseDto),
    };
  }

  /**
   * 查詢所偶學期課程
   */
  @Get('findAll')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findAll(
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return {
      semesters: await this.semesterCourseService.findAll(year, semester),
    };
  }

  /**
   * 針對user的角色類別，查詢所偶學期課程
   */
  @Get('findOwn')
  @UseGuards(AuthenticatedGuard)
  async findByUser(@Req() req: Request) {
    const { year, semester } = DateUtil.getYearAndSemester(new Date());
    return {
      semesters: await this.semesterCourseService.findByUser(
        req.user,
        year,
        semester,
      ),
    };
  }

  /**
   * 更新學期課程
   */
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async update(
    @Param('id') scID: string,
    @Body() updateDto: UpdateSemesterCourseDto,
  ) {
    return { result: this.semesterCourseService.update(scID, updateDto) };
  }

  /**
   * 刪除一個學期課程
   */
  @Delete('delete/:id')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async delete(@Param('id') scID: string) {
    return { result: await this.semesterCourseService.delete(scID) };
  }

  @Get('import')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async importSemesterCourses() {
    return { result: await this.crawlingService.importSemesterCourses() };
  }
}
