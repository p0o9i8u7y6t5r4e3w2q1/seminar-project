import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
  JoinTable,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Form } from './form.entity';
import { Classroom } from './classroom.entity';
import { FormProgress, PersonCheckStatus } from '../../util';

@Entity('booking_form')
export class BookingForm extends Form {
  @Column('tinyint', { name: 'is_iim_member' })
  private _iimMember: boolean = false;

  /**
   * 不是IIM成員的話，儲存使用者名稱
   */
  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'applicant_name',
  })
  private _applicantName: string = null;

  /**
   * 是IIM成員的話，儲存使用者ID
   */
  @Column('varchar', {
    nullable: true,
    length: 9,
    name: 'applicant_id',
  })
  private _applicantID: string = null;

  @Column('varchar', {
    length: 64,
    name: 'applicant_email',
  })
  private _applicantEmail: string = null;

  @Column('varchar', {
    length: 32,
    name: 'reason',
  })
  private _reason: string = null;

  @ManyToOne(type => Classroom, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  protected _classroom: Classroom;

  @RelationId((form: BookingForm) => form._classroom)
  protected _classroomID: string;

  @ManyToMany(type => Equipment, { nullable: true })
  @JoinTable({
    name: 'booking_equipment',
    joinColumn: { name: 'form_id' },
    inverseJoinColumn: { name: 'equip_id' },
  })
  private _equipments: Equipment[];

  @RelationId((bookingForm: BookingForm) => bookingForm._equipments)
  private _equipmentIDs: string[];

  @Column('tinyint', { name: 'depthead_check' })
  private _deptHeadCheckStatus: number = PersonCheckStatus.UnChecked;

  @Column('tinyint', { name: 'staff_check' })
  private _staffCheckStatus: number = PersonCheckStatus.UnChecked;

  @Column('int', { name: 'total_cost' })
  private _totalCost: number = 0;

  /**
   * 計算借用金額
   */
  public calculateTotalCost(): number {
    // TODO implement here
    return null;
  }

  public get iimMember() {
    return this._iimMember;
  }

  public set iimMember(iimMember: boolean) {
    this._iimMember = iimMember;
  }

  public get applicantName() {
    return this._applicantName;
  }

  public set applicantName(applicantName: string) {
    this._applicantName = applicantName;
  }

  public get applicantID() {
    return this._applicantID;
  }

  public set applicantID(applicantID: string) {
    this._applicantID = applicantID;
  }

  public get applicantEmail() {
    return this._applicantEmail;
  }

  public set applicantEmail(applicantEmail: string) {
    this._applicantEmail = applicantEmail;
  }

  public get reason() {
    return this._reason;
  }

  public set reason(reason: string) {
    this._reason = reason;
  }

  public get equipments() {
    return this._equipments;
  }

  public set equipments(equipments: Equipment[]) {
    this._equipments = equipments;
  }

  public get equipmentIDs() {
    return this._equipmentIDs;
  }

  /* XXX not support by typeorm 但可以做一些測試
  public set equipmentIDs(equipmentIDs: string[]) {
    this._equipmentIDs = equipmentIDs;
  }
   */

  public get deptHeadCheckStatus() {
    return this._deptHeadCheckStatus;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public set deptHeadCheckStatus(deptHeadCheckStatus: number) {
    this._deptHeadCheckStatus = deptHeadCheckStatus;
  }
   */

  public deptHeadCheck(isApproved: boolean) {
    this._deptHeadCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this._progress = FormProgress.Rejected;
    else if (this._progress === FormProgress.StaffApproved) {
      this._progress = FormProgress.Approved;
    } else this._progress = FormProgress.DeptHeadApproved;
  }

  public get staffCheckStatus() {
    return this._staffCheckStatus;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public set staffCheckStatus(staffCheckStatus: number) {
    this._staffCheckStatus = staffCheckStatus;
  }
   */

  public staffCheck(isApproved: boolean) {
    this._staffCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this._progress = FormProgress.Rejected;
    else if (this._progress === FormProgress.DeptHeadApproved) {
      this._progress = FormProgress.Approved;
    } else this._progress = FormProgress.StaffApproved;
  }

  public get totalCost() {
    return this._totalCost;
  }

  public set totalCost(totalCost: number) {
    this._totalCost = totalCost;
  }
}
