import { Entity, Column } from 'typeorm';
import { Form } from './form.entity';
import { DatePeriodRange } from '../common/date-period-range';

@Entity()
export class MakeupCourseForm extends Form {
  @Column()
  personID: string;

  @Column()
  classroomID: string;

  timeRange: DatePeriodRange;

  @Column()
  progress: number;

  public getPersonID(): string {
    return this.personID;
  }

  public setPersonID(personID: string): void {
    this.personID = personID;
  }

  public getClassroomID(): string {
    return this.classroomID;
  }

  public setClassroomID(classroomID: string): void {
    this.classroomID = classroomID;
  }

  public getTimeRange(): DatePeriodRange {
    return this.timeRange;
  }

  public setTimeRange(timeRange: DatePeriodRange): void {
    this.timeRange = timeRange;
  }

  public getProgress(): number {
    return this.progress;
  }

  public setProgress(progress: number): void {
    this.progress = progress;
  }
}
