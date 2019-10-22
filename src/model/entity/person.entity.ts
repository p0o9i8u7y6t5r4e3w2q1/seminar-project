import { Column } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Person {
  id: string;

  @Column('varchar', {
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
}
