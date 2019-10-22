import { SwipeCardResult } from '../../util';
import { Person, AlternateCard } from '../entity';
import { Exclude } from 'class-transformer';

export class RecordResponse {

  id: number;

  @Exclude()
  uid: string;

  classroomID: string;

  recordTime: Date;

  swipeResult: SwipeCardResult;

  cardOwner: Person | AlternateCard;

  constructor(init?: Partial<RecordResponse>) {
    Object.assign(this, init);
  }
}
