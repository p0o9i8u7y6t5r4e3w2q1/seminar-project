import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { BookingForm,Equipment } from '../../model/entity';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateScheduleChangeDto } from '../schedule/dto';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import { BookingFormRepository } from '../../model/repository';
import {
  RoleType,
  ScheduleChangeType,
  FormProgress,
  FormCheckedProgress,
  Period,
  EquipmentStatus,
} from '../../util';
import { DatePeriodRange } from 'dist/model/common';
import { EquipmemtType } from 'dist/util';

// ** 只有 save 才會保存relation **
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingForm)
    private readonly formRepository: BookingFormRepository,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
    @InjectRepository(Equipment)
    private readonly equipRepository:Repository<Equipment>,
  ) {}

  /**
   * 建立借用表單
   */
  async createFormByIIMMember(createFormDto: CreateIIMBookingFormDto) {
    const form = new BookingForm();
    const equipments = this.makeEquipments(createFormDto);
    this.formRepository.merge(form, createFormDto, {
      iimMember: true,
      equipments,   
    //三個step的流程??1與3的差異?
    });
    return await this.formRepository.save(form);
  }

  async createFormByNotIIMMember(createFormDto: CreateGeneralBookingFormDto) {
    const form = new BookingForm();
    const equipments = this.makeEquipments(createFormDto);
    this.formRepository.merge(form, createFormDto, {
      iimMember: false,
      equipments,
    });
    // TODO need to calculate total cost
    return await this.formRepository.save(form);
  }

  private makeEquipments(createFormDto: any): any[] {
    const equipments: any[] = [];
    if (createFormDto.equipmentIDs) {
      for (const id of createFormDto.equipmentIDs) {
        equipments.push({ id }); //這裡的eqiupments是eqiupmentId的string還是Eqiupment?
      }
    }
    return equipments;
  }

  /**
   * 找出所有的借用表單
   */
  async findAllForm() {
    return await this.formRepository.find({ relations: ['equipments'] });
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
  async findOneForm(formID: string): Promise<BookingForm> {
    return await this.formRepository.findOneByFormID(formID);
  }

  /**
   * 審核借用表單
   * @param roleType 角色代號
   * @param formID 表單流水號
   * @param isApproved 審核同意或拒絕
   */
  async checkForm(formID: string, roleType: number, isApproved: boolean) {
    console.log('check form param');
    console.log({ formID, roleType, isApproved });
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
    await this.formRepository.updateByFormID(formID, form);

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
  async deleteForm(formID: string,enteredEmail: string) {
    const targetForm=await this.formRepository.findOneByFormID(formID);
    if(enteredEmail==targetForm.applicantEmail){
      return await this.formRepository.deleteByFormID(formID);
    } else{
      throw new Error("Invalid email.");      
    }   
  }


  async findAvailableEquipment(searchRange:DatePeriodRange, selectedEquip:EquipmemtType){
    //所有Available的equipments
    const equipmentNeeded=await this.equipRepository.find({status: EquipmentStatus.Available,type:selectedEquip});

    //這個時間範圍通過的bookingForm以及其需要的設備
    const startIndex=Period.indexOf(searchRange.startPeriod);
    const endIndex=Period.indexOf(searchRange.endPeriod);    
    const searchPeriods=Period.slice(startIndex,endIndex+1);    
    
    const passedForms=await this.formRepository.find({
      relations:["equipments"],
      where:[
        {progress:FormProgress.Approved,timeRange:{date:searchRange.date,startPeriod:In([searchPeriods])},},
        {progress:FormProgress.Approved,timeRange:{date:searchRange.date,endPeriod:In([searchPeriods])}}
      ],      
    }); 

    let availEqiup:Equipment[] = [];
    for(let equip of equipmentNeeded){
      let avail=true;
      for(let passedForm of passedForms){
        for(let equipInUse of passedForm.equipments){
          if (equip.id==equipInUse.id){
            avail=false;
            break;
          }
        }
        if(!avail) break;
      }
      if(avail){
        availEqiup.push(equip);
      }
    }
    return availEqiup;
  }

  /*找出已經通過的表單*/
  // async findApprovedFormWithEquip(searchRange:DatePeriodRange, selectedEquip:EquipmemtType) {
    
  //   //這個時間範圍通過的bookingForm以及其需要的設備
  //   const startIndex=Period.indexOf(searchRange.startPeriod);
  //   const endIndex=Period.indexOf(searchRange.endPeriod);    
  //   const searchPeriods=Period.slice(startIndex,endIndex+1);
    
  //   // const passedFormEqiups:BookingForm[][]=[];   
  //   const passedFormEquip=await this.formRepository.find({
  //     relations:["equipments"],
  //     where:[
  //       {progress:FormProgress.Approved,timeRange:{date:searchRange.date,startPeriod:In([searchPeriods])},},
  //       {progress:FormProgress.Approved,timeRange:{date:searchRange.date,endPeriod:In([searchPeriods])}}
  //     ],      
  //   });      
  //   return passedFormEquip;             
  // } 

  /**
   * 計算借用金額
   * XXX 目前用不到，不必實做
   */
  // calculateTotalCost(): number {
  //   // TODO implement here
  //   return null;
  // }
}
