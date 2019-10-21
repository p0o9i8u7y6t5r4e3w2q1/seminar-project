import {
  DateUtil,
  RoomStatus,
  RoomEmptyStatus,
  RoomOccupyStatus,
} from '../../util';
import { Exclude, Transform, Expose } from 'class-transformer';

interface KeyObject {
  id?: string;
  type?: any;
  obj?: object;
}

export class ScheduleResult {
  @Expose({ groups: ['course'] })
  date: Date;

  @Expose({ groups: ['course'] })
  period: string;

  @Expose({ groups: ['course'] })
  classroomID: string;

  @Expose({ groups: ['classroom'] })
  scID: string = undefined;

  formID: string = undefined;

  status: RoomStatus = RoomStatus.Empty;

  // 主要相關的物件
  @Transform(key => key.obj)
  key: KeyObject = {};

  constructor(init?: Partial<ScheduleResult>) {
    Object.assign(this, init);
  }

  public isConflict(other: ScheduleResult): boolean {
    return (
      DateUtil.isSameDate(this.date, other.date) &&
      this.period === other.period &&
      this.classroomID === other.classroomID
    );
  }

  public isEmpty() {
    return RoomEmptyStatus.includes(this.status);
  }

  public isOccupy() {
    return RoomOccupyStatus.includes(this.status);
  }
}
