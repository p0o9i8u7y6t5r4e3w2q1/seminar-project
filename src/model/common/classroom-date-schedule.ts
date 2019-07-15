import { ScheduleResult } from './schedule-result';
export class ClassroomDateSchedule {
  classroomID: string;

  date: Date;

  schedules: ScheduleResult[];

  public getClassroomID(): string {
    return this.classroomID;
  }

  public setClassroomID(classroomID: string): void {
    this.classroomID = classroomID;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getSchedules(): ScheduleResult[] {
    return this.schedules;
  }

  public setSchedules(schedules: ScheduleResult[]): void {
    this.schedules = schedules;
  }
}
