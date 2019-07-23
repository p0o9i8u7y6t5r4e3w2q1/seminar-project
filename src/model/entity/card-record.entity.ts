import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity('card_record')
export class CardRecord {
  @PrimaryGeneratedColumn({ name: 'id' })
  private _id: number;

  @Column('char', {
    length: 8,
    name: 'card_uid',
  })
  private _uid: string;

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  private _classroom: Classroom | null;

  @RelationId((cardRecord: CardRecord) => cardRecord._classroom)
  private _classroomID: string;

  @Column('datetime', { name: 'record_time' })
  private _recordTime: Date;

  public getID() {
    return this._id;
  }

  public set ID(id: number) {
    this._id = id;
  }

  public getUID() {
    return this._uid;
  }

  public setUID(uid: string) {
    this._uid = uid;
  }

  public getClassroomID() {
    return this._classroomID;
  }

  public setClassroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  public getRecordTime() {
    return this._recordTime;
  }

  public setRecordTime(recordTime: Date) {
    this._recordTime = recordTime;
  }
}
