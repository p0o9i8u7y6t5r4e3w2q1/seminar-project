import { Controller, Get, Inject } from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ClassroomDateSchedule } from '../../model/common';
import { ApiUseTags } from '@nestjs/swagger';

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
    classroomID: string,
    startDate: Date,
    endDate: Date,
  ) {
    const cdss: ClassroomDateSchedule[] = await this.csService.fetchClassroomDateSchedules(
      classroomID,
      startDate,
      endDate,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data

    return cdss;
  }

  // checkScheduleConflict() {}
}
