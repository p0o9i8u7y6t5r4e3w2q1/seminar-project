import {
  UseGuards,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
  Inject,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType } from '../../util';
import { AccessGuard } from '../semester-course';
import { ApiUseTags } from '@nestjs/swagger';

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
  async createMakeupCourseForm(
    @Req() req: Request,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return {
      form: await this.ccService.createMakeupCourseForm(
        req.user.id,
        createFormDto,
      ),
    };
  }

  /**
   * 查詢補課申請
   */
  @Get('find/:id')
  async findMakeupCourseForm(@Param('id') id: string) {
    return { form: await this.ccService.findMakeupCourseForm(id) };
  }

  /**
   * 確認補課申請
   */
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async checkMakeupCourse(formID: string, @Body() isApproved: boolean) {
    return {
      result: await this.ccService.checkMakeupCourse(formID, isApproved),
    };
  }

  /**
   * 停課
   */
  @Post('suspended')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  async suspendedCourse(
    @Req() req: Request,
    @Body() suspendedCourseDto: SuspendedCourseDto,
  ) {
    return {
      result: await this.ccService.suspendedCourse(
        req.user.id,
        suspendedCourseDto,
      ),
    };
  }

  /**
   * 取得助教
   */
  @Get('course/:scID/TA')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  async getTAs(@Param('scID') scID: string) {
    return { TAs: await this.ccService.getTAs(scID) };
  }

  /**
   * 添加助教
   */
  @Put('course/:scID/addTA/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async addTA(@Param('scID') scID: string, @Param('studID') studentID: string) {
    return { result: await this.ccService.addTA(scID, studentID) };
  }

  /**
   * 刪除助教
   */
  @Put('course/:scID/removeTA/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    return { result: await this.ccService.removeTA(courseID, studentID) };
  }
}
