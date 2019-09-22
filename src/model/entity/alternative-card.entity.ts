import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Classroom } from './classroom.entity';

@Entity('alternatecard')
export class AlternateCard {
  @PrimaryColumn('char', { name: 'id', length: 6 })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  name: string;

  @Column('char', {
    nullable: true,
    length: 8,
    name: 'card_uid',
  })
  @Exclude()
  uid: string;

  @ManyToOne(() => Classroom, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  @Exclude()
  classroom: Classroom;

  @Column('char', {
    length: 5,
    nullable: true,
    name: 'room_id',
  })
  classroomID: string;

  constructor(init?: Partial<AlternateCard>) {
    Object.assign(this, init);
  }
}
