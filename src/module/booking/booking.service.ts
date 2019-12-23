import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not } from 'typeorm';
import { BookingForm } from '../../model/entity';
import { DatePeriodRange } from '../../model/common';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateScheduleChangeDto } from '../schedule/dto';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import { BookingFormRepository } from '../../model/repository';
import {
  RoleType,
  ScheduleChangeType,
  FormProgress,
  FormCheckedProgress,
} from '../../util';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InformService } from '../shared';

const STAFF_BF_COUNT = 'staffBookingCount'; // number of pending form for staff
const DEPTHEAD_BF_COUNT = 'deptHeadBookingCount'; // number of pending form for deptHead

// ** 只有 save 才會保存relation **
@Injectable()
export class BookingService {
  private staffPendingCount$ = new BehaviorSubject(1);
  private deptHeadPendingCount$ = new BehaviorSubject(1);

  constructor(
    @InjectRepository(BookingForm)
    private readonly formRepository: BookingFormRepository,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
    @Inject(InformService)
    private readonly inform: InformService,
  ) {
    const switchmap = (roleType: RoleType) =>
      switchMap(() => this.findPendingFormsCount(roleType));

    this.inform.register(
      STAFF_BF_COUNT,
      this.staffPendingCount$.pipe(switchmap(RoleType.Staff)),
    );
    this.inform.register(
      DEPTHEAD_BF_COUNT,
      this.deptHeadPendingCount$.pipe(switchmap(RoleType.DeptHead)),
    );
  }

  public async findPendingFormsCount(roleType: RoleType) {
    switch (roleType) {
      case RoleType.DeptHead:
        return await this.formRepository.count({
          progress: In([FormProgress.Pending, FormProgress.StaffApproved]),
        });
      case RoleType.Staff:
        return await this.formRepository.count({
          progress: In([FormProgress.Pending, FormProgress.DeptHeadApproved]),
        });
    }
  }

  /**
   * 建立借用表單
   */
  async createFormByIIMMember(createFormDto: CreateIIMBookingFormDto) {
    const form = new BookingForm();
    const equipments = this.makeEquipments(createFormDto);
    this.formRepository.merge(form, createFormDto, {
      iimMember: true,
      equipments,
    });
    return await this.formRepository.save(form).then(result => {
      this.staffPendingCount$.next(1);
      this.deptHeadPendingCount$.next(1);
      return result;
    });
  }

  async createFormByNotIIMMember(createFormDto: CreateGeneralBookingFormDto) {
    const form = new BookingForm();
    const equipments = this.makeEquipments(createFormDto);
    this.formRepository.merge(form, createFormDto, {
      iimMember: false,
      equipments,
    });
    // TODO need to calculate total cost
    return await this.formRepository.save(form).then(result => {
      this.staffPendingCount$.next(1);
      this.deptHeadPendingCount$.next(1);
      return result;
    });
  }

  private makeEquipments(createFormDto: any): any[] {
    const equipments: any[] = [];
    if (createFormDto.equipmentIDs) {
      for (const id of createFormDto.equipmentIDs) {
        equipments.push({ id });
      }
    }
    return equipments;
  }

  /**
   * 找出所有的借用表單
   */
  async findAllForm() {
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

  async findApprovedFormByTimeRange(
    searchRange: DatePeriodRange,
    relations?: string[],
  ): Promise<BookingForm[]> {
    // 這個時間範圍通過的bookingForm

    return await this.formRepository.find({
      relations,
      where: {
        progress: FormProgress.Approved,
        timeRange: searchRange.makeFindOption(),
      },
    });
  }

  /**
   * 找出指定id(流水號)的表單
   * @param id 表單流水號
   * @return
   */
  async findOneForm(
    formID: string,
    relations?: string[],
  ): Promise<BookingForm> {
    return await this.formRepository.findOneByFormID(formID, relations);
  }

  /**
   * 審核借用表單
   * @param roleType 角色代號
   * @param formID 表單流水號
   * @param isApproved 審核同意或拒絕
   */
  async checkForm(formID: string, roleType: number, isApproved: boolean) {
    const form = await this.findOneForm(formID);
    if (form.progress === FormProgress.Approved) return;

    switch (roleType) {
      case RoleType.DeptHead:
        form.deptHeadCheck(isApproved);
        break;
      case RoleType.Staff:
        form.staffCheck(isApproved);
        break;
    }
    await this.formRepository.save(form);
    this.staffPendingCount$.next(1);
    this.deptHeadPendingCount$.next(1);

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
  async deleteForm(formID: string, enteredEmail: string) {
    const targetForm = await this.formRepository.findOneByFormID(formID);
    if (targetForm.progress !== FormProgress.Pending) {
      throw new ForbiddenException('Cannot delete checked form');
    } else if (enteredEmail === targetForm.applicantEmail) {
      return await this.formRepository.deleteByFormID(formID);
    } else {
      throw new ForbiddenException('Invalid email.');
    }
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
