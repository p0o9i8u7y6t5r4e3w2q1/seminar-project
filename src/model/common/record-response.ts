import { SwipeCardResult } from '../../util';

export class RecordResponse {
  id: number;
  uid: string;
  classroomID: string;
  recordTime: Date;
  swipeResult: SwipeCardResult;
  cardOwner: string;

  constructor(init?: Partial<RecordResponse>) {
    Object.assign(this, init);
  }
}
