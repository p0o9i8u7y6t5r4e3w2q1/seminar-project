import { SwipeCardResult } from '../../util';
import { Person, AlternateCard } from '../entity';
import { Exclude, Transform } from 'class-transformer';

export class RecordResponse {
  @Exclude()
  id: number;

  @Exclude({ toPlainOnly: true })
  uid: string;

  classroomID: string;

  recordTime: Date;

  swipeResult: SwipeCardResult;
  @Transform(value => value ? value.name : undefined, { toPlainOnly: true })
  cardOwner: Person | AlternateCard;

  constructor(init?: Partial<RecordResponse>) {
    Object.assign(this, init);
  }
}
