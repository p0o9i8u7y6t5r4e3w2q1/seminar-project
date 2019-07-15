import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class CardRecord {
  @PrimaryColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  classroomID: string;

  @Column()
  recordTime: Date;

  public getID(): number {
    return this.id;
  }

  public setID(id: number): void {
    this.id = id;
  }

  public getUID(): string {
    return this.uid;
  }

  public setUID(uid: string): void {
    this.uid = uid;
  }

  public getClassroomID(): string {
    return this.classroomID;
  }

  public setClassroomID(classroomID: string): void {
    this.classroomID = classroomID;
  }

  public getRecordTime(): Date {
    return this.recordTime;
  }

  public setRecordTime(recordTime: Date): void {
    this.recordTime = recordTime;
  }
}
