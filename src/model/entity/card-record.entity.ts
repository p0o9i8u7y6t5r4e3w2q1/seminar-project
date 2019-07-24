import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity('card_record')
export class CardRecord {
  private _id: number;

  private _uid: string;

  private _classroom: Classroom;

  private _classroomID: string;

  private _recordTime: Date;

  /* ---- setter and getter ---- */
  @PrimaryGeneratedColumn({ name: 'id' })
  public get id() {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  @Column('char', {
    length: 8,
    name: 'card_uid',
  })
  public get uid() {
    return this._uid;
  }
  public set uid(uid: string) {
    this._uid = uid;
  }

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  public get classroom() {
    return this._classroom;
  }
  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @Column('datetime', { name: 'record_time' })
  public getRecordTime() {
    return this._recordTime;
  }
  public setRecordTime(recordTime: Date) {
    this._recordTime = recordTime;
  }
}
