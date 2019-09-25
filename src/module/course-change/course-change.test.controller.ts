import {
  Controller,
  Post,
  Put,
  Get,
  Query,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('test')
@Controller('test/course-change')
export class CourseChangeTestController {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
  ) {}

  /**
   * 補課申請
   */
  @ApiOperation({ title: '新增補課申請' })
  @Post('makeup')
  async createMakeupCourseForm(
    @Query('userID') userID: string,
    @Param('scID') scID: string,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return await this.ccService.createMakeupCourseForm(
      userID,
      scID,
      createFormDto,
    );
  }

  /**
   * 查詢補課申請
   */
  @ApiOperation({ title: '查詢補課申請' })
  @Get('find/:formID')
  async findMakeupCourseForm(@Param('formID') id: string) {
    return await this.ccService.findMakeupCourseForm(id);
  }

  /**
   * 審核補課申請
   */
  @ApiOperation({ title: '審核申請' })
  @Put('check/:formID')
  async checkMakeupCourse(
    @Param('formID') formID: string,
    @Body() isApproved: boolean,
  ) {
    return await this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @ApiOperation({ title: '停課申請' })
  @Post('suspended/:scID')
  async suspendedCourse(
    @Query('userID') userID: string,
    @Param('scID') scID: string,
    @Body() suspendedCourseDto: SuspendedCourseDto,
  ) {
    return this.ccService.suspendedCourse(userID, scID, suspendedCourseDto);
  }

  /**
   * 取得助教
   */
  @ApiOperation({ title: '查詢課程所有助教' })
  @Get('course/:scID/TA')
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
  @ApiOperation({ title: '添加課程助教' })
  @Put('course/:scID/addTA/:studID')
  async addTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    return await this.ccService.addTA(courseID, studentID);
  }

  /**
   * 刪除助教
   */
  @ApiOperation({ title: '刪除課程助教' })
  @Put('course/:scID/removeTA/:studID')
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    this.ccService.removeTA(courseID, studentID);
  }

  /**
   * 找出待審核的申請
   */
  @ApiOperation({ title: '查詢所有待審核申請' })
  @Get('findPending')
  async findPendingForm() {
    return await this.ccService.findPendingForm();
  }

  /**
   * 找出已審核的申請
   */
  @ApiOperation({ title: '查詢所有已審核申請' })
  @Get('findChecked')
  async findCheckedForm() {
    return await this.ccService.findCheckedForm();
  }
}
