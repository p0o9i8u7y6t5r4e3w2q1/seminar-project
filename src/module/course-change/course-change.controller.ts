import {
  OnModuleInit,
  UseGuards,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  Inject,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { CheckFormDto, FindFormDto, InformService } from '../shared';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType, SUCCESS } from '../../util';
import { AccessGuard } from '../semester-course';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BehaviorSubject } from 'rxjs';

const MF_COUNT = 'makeupCount'; // number of pending form

@ApiUseTags('course change')
@Controller('course-change')
export class CourseChangeController implements OnModuleInit {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
    @Inject(InformService)
    private readonly inform: InformService,
  ) {}

  private pendingCount = 0;
  async onModuleInit() {
    this.pendingCount = await this.ccService.findPendingFormsCount();
    const subject = new BehaviorSubject(this.pendingCount);
    this.inform.register(MF_COUNT, subject);
  }

  private notify(event: 'new' | 'check') {
    if (event == 'new') {
      this.inform.next(MF_COUNT, ++this.pendingCount);
    } else {
      // event == 'check'
      this.inform.next(MF_COUNT, --this.pendingCount);
    }
  }

  /**
   * 補課申請
   */
  @ApiOperation({ title: '新增補課申請' })
  @Post(':scID/makeup')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async createMakeupCourseForm(
    @Req() req: any,
    @Param('scID') scID: string,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    const form = await this.ccService.createMakeupCourseForm(
      req.user.id,
      scID,
      createFormDto,
    );
    this.notify('new');
    return form;
  }

  /**
   * 停課
   */
  @ApiOperation({ title: '停課申請' })
  @Post(':scID/suspended')
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
   * 找出待審核的補課申請
   */
  @ApiOperation({ title: '查詢所有待審核補課申請' })
  @Get('makeup/pending')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  @SerializeOptions({ groups: ['simple'] }) // to remove user email message
  async findPendingForm() {
    return await this.ccService.findPendingForm();
  }

  /**
   * 找出已審核的補課申請
   */
  @ApiOperation({ title: '查詢所有已審核補課申請' })
  @Get('makeup/checked')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  @SerializeOptions({ groups: ['simple'] }) // to remove user email message
  async findCheckedForm() {
    return await this.ccService.findCheckedForm();
  }

  /**
   * 查詢補課申請
   */
  @ApiOperation({ title: '查詢補課申請' })
  @Get('makeup/:formID')
  async findMakeupCourseForm(@Param() dto: FindFormDto) {
    return await this.ccService.findMakeupCourseForm(dto.formID);
  }

  /**
   * 審核補課申請
   */
  @ApiOperation({ title: '審核補課申請' })
  @Put('makeup/:formID/check')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Staff)
  async checkMakeupCourse(
    @Param('formID') formID: string,
    @Body() checkDto: CheckFormDto,
  ) {
    await this.ccService.checkMakeupCourse(formID, checkDto.isApproved);
    this.notify('check');
    return SUCCESS;
  }

  /**
   * 取得助教
   */
  @ApiOperation({ title: '查詢課程所有助教' })
  @Get(':scID/TAs')
  @UseGuards(AuthenticatedGuard, AccessGuard)
  @ApiBearerAuth()
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
  @ApiOperation({ title: '添加課程助教' })
  @Post(':scID/TAs/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async addTA(@Param('scID') scID: string, @Param('studID') studentID: string) {
    await this.ccService.addTA(scID, studentID);
    return SUCCESS;
  }

  /**
   * 刪除助教
   */
  @ApiOperation({ title: '刪除課程助教' })
  @Delete(':scID/TAs/:studID')
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    await this.ccService.removeTA(courseID, studentID);
    return SUCCESS;
  }

  /**
   * 查詢申請歷史紀錄
   */
  @ApiOperation({ title: '查詢課程異動紀錄' })
  @UseGuards(AuthenticatedGuard, RolesGuard, AccessGuard)
  @ApiBearerAuth()
  @Roles(RoleType.Teacher, RoleType.DeptHead, RoleType.Staff)
  @Get(':scID/history')
  @SerializeOptions({ groups: ['simple'] }) // to remove user email message
  async findCourseChangeHistory(@Param('scID') scID: string) {
    return await this.ccService.findHistory(scID);
  }
}
