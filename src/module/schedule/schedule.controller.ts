import { Controller, Get } from '@nestjs/common';

@Controller('schedule')
export class ScheduleController {

    /** 
     * 查詢可借用時段
     */
    @Get()
    findClassroomWeekSchedule() {
    }
}
