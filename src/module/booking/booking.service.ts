import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BookingForm } from '../../model/entity';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import { RoleType, FormProgress } from '../../util';

// TODO 初步寫完，需要測試
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingForm)
    private readonly formRepository: Repository<BookingForm>,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}
  /**
   * 建立借用表單
   */
  createFormByIIMMember(createFormDto: CreateIIMBookingFormDto) {
    let form = new BookingForm();
    form = this.formRepository.merge(form, createFormDto, { iimMember: true });
    this.formRepository.insert(form);
  }

  createFormByNotIIMMember(createFormDto: CreateGeneralBookingFormDto) {
    let form = new BookingForm();
    form = this.formRepository.merge(form, createFormDto, { iimMember: false });
    // TODO need to calculate total cost
    this.formRepository.insert(form);
  }

  /**
   * 找出所有的借用表單
   */
  async findAllForm() {
    // TODO implement here
    return await this.formRepository.find();
  }

  /**
   * 找出待審核的申請
   */
  async findPendingForm(roleType: number) {
    switch (roleType) {
      case RoleType.DeptHead:
        return await this.formRepository.find({
          progress: In([FormProgress.Pending, FormProgress.StaffApproved]),
        });
      case RoleType.Staff:
        return await this.formRepository.find({
          progress: In([FormProgress.Pending, FormProgress.DeptHeadApproved]),
        });
    }
  }

  /**
   * 找出已審核的申請
   */
  findCheckedForm(roleType: number) {
    switch (roleType) {
      case RoleType.DeptHead:
        return this.formRepository.find({
          progress: In([FormProgress.Pending, FormProgress.StaffApproved]),
        });
      case RoleType.Staff:
        return this.formRepository.find({
          progress: In([FormProgress.Pending, FormProgress.DeptHeadApproved]),
        });
    }
  }

  /**
   * 找出指定id(流水號)的表單
   * @param id 表單流水號
   * @return
   */
  async findOneForm(id: string): Promise<BookingForm> {
    return await this.formRepository.findOne(id);
  }

  /**
   * 審核借用表單
   * @param roleType 角色代號
   * @param formID 表單流水號
   * @param isApproved 審核同意或拒絕
   */
  async checkForm(roleType: number, formID: string, isApproved: boolean) {
    const form = await this.findOneForm(formID);
    switch (roleType) {
      case RoleType.DeptHead:
        form.deptHeadCheck(isApproved);
        break;
      case RoleType.Staff:
        form.staffCheck(isApproved);
        break;
    }
  }

  /**
   * 刪除表單
   */
  deleteForm(id: string) {
    // TODO implement here
    this.formRepository.delete(id);
  }
  /**
   * 計算借用金額
   * XXX 目前用不到，不必實做
   */
  // calculateTotalCost(): number {
  //   // TODO implement here
  //   return null;
  // }
}
