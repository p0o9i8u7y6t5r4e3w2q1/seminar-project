import { Column } from 'typeorm';

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
  uid: string;
}
