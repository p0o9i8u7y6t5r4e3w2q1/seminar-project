import { Controller, Get, Inject } from '@nestjs/common';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { ClassroomDateSchedule } from '../../model/common';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ClassroomScheduleService)
    private readonly classroomScheduleService: ClassroomScheduleService,
  ) {}
  /**
   * 查詢可借用時段
   */
  @Get()
  async findClassroomSchedule(
    classroomID: string,
    startDate: Date,
    endDate: Date,
  ) {
    const cdss: ClassroomDateSchedule[] = await this.classroomScheduleService.fetchClassroomDateSchedules(
      classroomID,
      startDate,
      endDate,
      true,
    );

    // TODO transform ClassroomDateSchedule to appropriate output data
  }

  checkScheduleConflict() {}
}
