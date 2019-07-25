import { RoomStatus, RoomEmptyStatus, RoomOccupyStatus } from '../../util';

export class ScheduleResult {
  private _scID: string = null;

  private _formID: string = null;

  private _status: RoomStatus = RoomStatus.Empty;

  public get scID() {
    return this._scID;
  }

  public set scID(scID: string) {
    this._scID = scID;
  }

  public get formID() {
    return this._formID;
  }
  public set formID(formID: string) {
    this._formID = formID;
  }

  public get status() {
    return this._status;
  }
  public set status(status: number) {
    this._status = status;
  }

  public isEmpty() {
    return RoomEmptyStatus.includes(this._status);
  }

  public isOccupy() {
    return RoomOccupyStatus.includes(this._status);
  }
}
