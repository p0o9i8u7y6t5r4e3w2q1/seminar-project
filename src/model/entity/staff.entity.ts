import { Entity } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Staff extends Person {}
