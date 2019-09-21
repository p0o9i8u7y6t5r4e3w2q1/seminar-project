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
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

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
  @Post('makeup')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async createMakeupCourseForm(
    @Req() req: any,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return await this.ccService.createMakeupCourseForm(
      req.user.id,
      createFormDto,
    );
  }

  /**
   * 查詢補課申請
   */
  @Get('find/:id')
  async findMakeupCourseForm(@Param('id') id: string) {
    return await this.ccService.findMakeupCourseForm(id);
  }

  /**
   * 確認補課申請
   */
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Staff)
  async checkMakeupCourse(formID: string, @Body() isApproved: boolean) {
    return await this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @Post('suspended')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async suspendedCourse(
    @Req() req: any,
    @Body() suspendedCourseDto: SuspendedCourseDto,
  ) {
    return await this.ccService.suspendedCourse(
      req.user.id,
      suspendedCourseDto,
    );
  }

  /**
   * 取得助教
   */
  @Get('course/:scID/TA')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
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
