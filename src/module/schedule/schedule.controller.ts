import {
  Controller,
  Param,
  Post,
  Get,
  Body,
  Inject,
  Query,
  BadRequestException,
  SerializeOptions,
} from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ScheduleService } from './schedule.service';
import { ClassroomDateSchedule } from '../../model/common';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ParseDatePipe, DatePeriodRangeDto } from '../shared';
import { DateUtil } from '../../util';

@ApiUseTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ClassroomScheduleService)
    private readonly roomScheduleService: ClassroomScheduleService,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}

  /**
   * 查詢可借用時段
   */
  @ApiOperation({ title: '查詢可借用時段' })
  @ApiImplicitQuery({
    name: 'from',
    type: String,
    description: '起始日期-e.g."2018-01-01"',
  })
  @ApiImplicitQuery({
    name: 'to',
    type: String,
    description: '結束日期-e.g."2018-01-01"',
  })
  @Get('/classroom/:classroomID')
  @SerializeOptions({ groups: ['classroom'] })
  async findClassroomSchedule(
    @Param('classroomID') classroomID: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    const diff = DateUtil.diffDays(to, from);
    if (diff > 6) {
      throw new BadRequestException('cannot query more than 7 days');
    } else if (diff < 0) {
      throw new BadRequestException("'from' must not after 'to'");
    }

    const cdss: ClassroomDateSchedule[] = await this.roomScheduleService.findClassroomDateSchedules(
      classroomID,
      from,
      to,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data

    await this.roomScheduleService.loadCourseKeyObject(cdss);
    return cdss;
  }

  @ApiOperation({ title: '依課程查詢有上課時段' })
  @ApiImplicitQuery({
    name: 'from',
    type: String,
    description: '起始日期-e.g."2018-01-01"',
  })
  @ApiImplicitQuery({
    name: 'to',
    type: String,
    description: '結束日期-e.g."2018-01-01"',
  })
  @Get('semester-course/:scID')
  @SerializeOptions({ groups: ['course'] })
  async findCourseSchedule(
    @Param('scID') scID: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    const diff = DateUtil.diffDays(to, from);
    if (diff > 6) {
      throw new BadRequestException('cannot query more than 7 days');
    } else if (diff < 0) {
      throw new BadRequestException("'from' must not after 'to'");
    }

    return this.scheduleService.findCourseSchedule(scID, from, to);
  }

  @ApiOperation({ title: '查詢某時段教室是否衝堂' })
  @Post('classroom/:classroomID/conflict')
  async checkScheduleConflict(
    @Param('classroomID') classroomID: string,
    @Body() dto: DatePeriodRangeDto,
  ) {
    return await this.roomScheduleService.isConflict(classroomID, dto);
  }

  @ApiOperation({ title: '查詢某時段可用教室' })
  @Post('classroom/available')
  async findAvailableClassrooms(@Body() dto: DatePeriodRangeDto) {
    return await this.roomScheduleService.findAvailableClassrooms(
      dto.toDatePeriodRange(),
    );
  }
}
