import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SwipeCardResult } from '../../util';
import { Classroom } from './classroom.entity';
import { dateTransformer } from '../transformer/date.transformer';

@Entity('card_record')
export class CardRecord {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('char', {
    length: 8,
    name: 'card_uid',
  })
  uid: string;

  @ManyToOne(() => Classroom, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  classroom: Classroom;

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @Column('datetime', { name: 'record_time' })
  recordTime: Date;

  @Column('tinyint', { name: 'swipe_result' })
  swipeResult: SwipeCardResult = SwipeCardResult.Failed;

  constructor(init?: Partial<CardRecord>) {
    Object.assign(this, init);
  }
}
