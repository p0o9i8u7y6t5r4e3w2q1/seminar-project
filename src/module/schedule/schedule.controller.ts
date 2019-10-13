import {
  Controller,
  Param,
  Get,
  Inject,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ScheduleService } from './schedule.service';
import { ClassroomDateSchedule } from '../../model/common';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { ParseDatePipe } from '../shared';
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
  async findClassroomSchedule(
    @Param('classroomID') classroomID: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    const diff = DateUtil.diffDays(to, from);
    if (diff > 7) {
      throw new BadRequestException('cannot query more than 7 days');
    } else if (diff < 0) {
      throw new BadRequestException('\'from\' must not after \'to\'');
    }

    const cdss: ClassroomDateSchedule[] = await this.roomScheduleService.findClassroomDateSchedules(
      classroomID,
      from,
      to,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data

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
  async findCourseSchedule(
    @Param('scID') scID: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    const diff = DateUtil.diffDays(to, from);
    if (diff > 7) {
      throw new BadRequestException('cannot query more than 7 days');
    } else if (diff < 0) {
      throw new BadRequestException('\'from\' must not after \'to\'');
    }

    return this.scheduleService.findCourseSchedule(scID, from, to);
  }

  // checkScheduleConflict() {}
}
