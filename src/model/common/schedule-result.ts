import { RoomStatus, RoomEmptyStatus, RoomOccupyStatus } from '../../util';

export class ScheduleResult {
  scID: string = null;

  formID: string = null;

  status: RoomStatus = RoomStatus.Empty;

  constructor(init?: Partial<ScheduleResult>) {
    Object.assign(this, init);
  }

  public isEmpty() {
    return RoomEmptyStatus.includes(this.status);
  }

  public isOccupy() {
    return RoomOccupyStatus.includes(this.status);
  }
}
