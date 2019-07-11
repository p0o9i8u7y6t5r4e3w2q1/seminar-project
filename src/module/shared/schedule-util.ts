import { Injectable } from '@nestjs/common';
import { Schedule } from '../entity/schedule.entity'

@Injectable()
export class ScheduleUtil {

    /**
     * 多個Schedule轉成一個String(表示課程時間)
     */
    schedulesToString(scheds: Schedule[]) :  string {
        // TODO implement here
        return "";
    }

    /**
     * 一個String(表示上課時間)轉成多個Schedule
     */
    parseSchedules(timeStr: string) :  Schedule[] {
        // TODO implement here
        return null;
    }
}
