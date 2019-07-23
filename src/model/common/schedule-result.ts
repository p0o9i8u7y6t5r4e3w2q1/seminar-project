/*
import {
  Form,
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
} from '../entity';
 */
import {
  FormProgress,
  FormPendingProgress,
  RoomStatus,
  RoomEmptyStatus,
  RoomOccupyStatus,
  ScheduleChangeType,
} from '../../util';

export class ScheduleResult {
  private _scID: string;

  private _formID: string;

  private _status: number;

  // constructor(data?: Schedule | ScheduleChange | Form) {
  //  this.resetStatus(data);
  // }

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

  /*
  public resetStatus(data?: Schedule | ScheduleChange | Form) {
    this.scID = null;
    this.formID = null;
    this.status = RoomStatus.Empty;

    if (
      data instanceof Schedule &&
      this.status !== RoomStatus.SuspendedCourse
    ) {
      // Schedule
      this.scID = data.getScID();
      this.formID = null;
      this.status = RoomStatus.NormalCourse;
    } else if (data instanceof ScheduleChange) {
      // Schedule Change
      this.scID = data.getScID();
      this.formID = data.getFormID();

      if (data.getType() === ScheduleChangeType.Added) {
        this.status = RoomStatus.MakeupCourse;
      } else {
        // data.getType == ScheduleChangeType.Deleted
        this.status = RoomStatus.SuspendedCourse;
      }
    } else if (data instanceof BookingForm) {
      // BookingForm
      this.scID = null;
      this.formID = data.getID();
      const progress = data.getProgress();

      if (FormPendingProgress.includes(progress)) {
        this.status = RoomStatus.Pending;
      } else if (progress === FormProgress.Approved) {
        this.status = RoomStatus.Reserved;
      } else {
        this.status = RoomStatus.Empty;
      }
    } else if (data instanceof MakeupCourseForm) {
      // MakeupCourseForm
      this.scID = data.getScID();
      this.formID = data.getID();
      const progress = data.getProgress();

      if (FormPendingProgress.includes(progress)) {
        this.status = RoomStatus.Pending;
      } else if (progress === FormProgress.Approved) {
        this.status = RoomStatus.MakeupCourse;
      } else {
        this.status = RoomStatus.Empty;
      }
    }
  }
   */
}
