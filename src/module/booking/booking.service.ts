import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BookingForm } from '../../model/entity';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateScheduleChangeDto } from '../schedule/dto';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import {
  RoleType,
  ScheduleChangeType,
  FormProgress,
  FormCheckedProgress,
} from '../../util';

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
  async createFormByIIMMember(createFormDto: CreateIIMBookingFormDto) {
    const form = new BookingForm();
    this.formRepository.merge(form, createFormDto, { iimMember: true });
    return await this.formRepository.insert(form);
  }

  async createFormByNotIIMMember(createFormDto: CreateGeneralBookingFormDto) {
    const form = new BookingForm();
    this.formRepository.merge(form, createFormDto, { iimMember: false });
    // TODO need to calculate total cost
    return await this.formRepository.insert(form);
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
  async findCheckedForm(roleType: number) {
    switch (roleType) {
      case RoleType.DeptHead:
        return await this.formRepository.find({
          progress: In([FormProgress.DeptHeadApproved, ...FormCheckedProgress]),
        });
      case RoleType.Staff:
        return await this.formRepository.find({
          progress: In([FormProgress.StaffApproved, ...FormCheckedProgress]),
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
  async checkForm(formID: string, roleType: number, isApproved: boolean) {
    const form = await this.findOneForm(formID);
    switch (roleType) {
      case RoleType.DeptHead:
        form.deptHeadCheck(isApproved);
        break;
      case RoleType.Staff:
        form.staffCheck(isApproved);
        break;
    }

    if (form.progress === FormProgress.Approved) {
      const dto = CreateScheduleChangeDto.createByAny(form, {
        type: ScheduleChangeType.Added,
      });
      return await this.scheduleService.createScheduleChange(dto);
    }
    return form;
  }

  /**
   * 刪除表單
   */
  async deleteForm(id: string) {
    // TODO implement here
    return await this.formRepository.delete(id);
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
