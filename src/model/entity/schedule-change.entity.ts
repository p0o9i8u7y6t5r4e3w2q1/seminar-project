import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ScheduleChange {
  @PrimaryColumn()
  classroomID: string;

  @PrimaryColumn()
  date: Date;

  @PrimaryColumn()
  period: string;

  @Column()
  scID: string;

  @Column()
  formID: string;

  @Column()
  type: number;

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

  public getScID(): string {
    return this.scID;
  }

  public setScID(scID: string): void {
    this.scID = scID;
  }
  public getPeriod(): string {
    return this.period;
  }

  public setPeriod(period: string): void {
    this.period = period;
  }

  public getFormID(): string {
    return this.formID;
  }

  public setFormID(formID: string): void {
    this.formID = formID;
  }

  public getType(): number {
    return this.type;
  }

  public setType(type: number): void {
    this.type = type;
  }
}
