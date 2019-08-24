import {
  Controller,
  Get,
  Inject,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ClassroomDateSchedule } from '../../model/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ParseDatePipe } from '../shared';
import { DateUtil } from '../../util';

@ApiUseTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ClassroomScheduleService)
    private readonly csService: ClassroomScheduleService,
  ) {}

  /**
   * 查詢可借用時段
   */
  @Get('find')
  async findClassroomSchedule(
    @Query('classroomID') classroomID: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    if (DateUtil.diffDays(to, from) > 7) {
      return new BadRequestException('cannot query more than 7 days');
    }

    const cdss: ClassroomDateSchedule[] = await this.csService.fetchClassroomDateSchedules(
      classroomID,
      from,
      to,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data

    return { result: cdss };
  }

  // checkScheduleConflict() {}
}
