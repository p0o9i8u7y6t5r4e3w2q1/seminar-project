import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryColumn()
  weekday: number;

  /**
   * 節次
   */
  @PrimaryColumn()
  period: string;

  @PrimaryColumn()
  classroomID: string;

  @Column()
  scID: string;

  public getWeekday(): number {
    return this.weekday;
  }

  public setWeekday(weekday: number): void {
    this.weekday = weekday;
  }

  public getPeriod(): string {
    return this.period;
  }

  public setPeriod(period: string): void {
    this.period = period;
  }

  public getClassroomID(): string {
    return this.classroomID;
  }

  public setClassroomID(classroomID: string): void {
    this.classroomID = classroomID;
  }

  public getScID(): string {
    return this.scID;
  }

  public setScID(scID: string): void {
    this.scID = scID;
  }
}
