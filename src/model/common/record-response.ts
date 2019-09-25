import { SwipeCardResult } from '../../util';
import { Exclude } from 'class-transformer';

export class RecordResponse {
  id: number;

  @Exclude()
  uid: string;

  classroomID: string;

  recordTime: Date;

  swipeResult: SwipeCardResult;

  cardOwner: string;

  constructor(init?: Partial<RecordResponse>) {
    Object.assign(this, init);
  }
}
