import {
  UseGuards,
  Controller,
  Post,
  Put,
  Get,
  Param,
  Body,
  Inject,
  Req,
} from '@nestjs/common';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType } from '../../util';
import { AccessGuard } from '../semester-course';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('course change')
@Controller('course-change')
export class CourseChangeController {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
  ) {}

  /**
   * 補課申請
   */
  @ApiOperation({ title: '新增補課申請' })
  @Post('makeup/:scID')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async createMakeupCourseForm(
    @Req() req: any,
    @Param('scID') scID: string,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return await this.ccService.createMakeupCourseForm(
      req.user.id,
      scID,
      createFormDto,
    );
  }

  /**
   * 查詢補課申請
   */
  @ApiOperation({ title: '查詢補課申請' })
  @Get('find/:formID')
  async findMakeupCourseForm(@Param('formID') formID: string) {
    return await this.ccService.findMakeupCourseForm(formID);
  }

  /**
   * 找出待審核的申請
   */
  @ApiOperation({ title: '查詢所有待審核申請' })
  @Get('findPending')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findPendingForm() {
    return await this.ccService.findPendingForm();
  }

  /**
   * 找出已審核的申請
   */
  @ApiOperation({ title: '查詢所有已審核申請' })
  @Get('findChecked')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findCheckedForm() {
    return await this.ccService.findCheckedForm();
  }

  /**
   * 審核補課申請
   */
  @ApiOperation({ title: '審核補課申請' })
  @Put('check/:formID')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Staff)
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
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async suspendedCourse(
    @Req() req: any,
    @Param('scID') scID: string,
    @Body() suspendedCourseDto: SuspendedCourseDto,
  ) {
    return await this.ccService.suspendedCourse(
      req.user.id,
      scID,
      suspendedCourseDto,
    );
  }

  /**
   * 取得助教
   */
  @ApiOperation({ title: '查詢課程所有助教' })
  @Get('course/:scID/TA')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
  @ApiOperation({ title: '添加課程助教' })
  @Put('course/:scID/addTA/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async addTA(@Param('scID') scID: string, @Param('studID') studentID: string) {
    return await this.ccService.addTA(scID, studentID);
  }

  /**
   * 刪除助教
   */
  @ApiOperation({ title: '刪除課程助教' })
  @Put('course/:scID/removeTA/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    return await this.ccService.removeTA(courseID, studentID);
  }
}
