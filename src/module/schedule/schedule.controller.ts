import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ClassroomDateSchedule } from '../../model/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ParseDatePipe } from '../shared';

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
    const cdss: ClassroomDateSchedule[] = await this.csService.fetchClassroomDateSchedules(
      classroomID,
      from,
      to,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data

    return cdss;
  }

  // checkScheduleConflict() {}
}
