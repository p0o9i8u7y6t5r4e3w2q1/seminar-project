import { Entity } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Student extends Person {}
