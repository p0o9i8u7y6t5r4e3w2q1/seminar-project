import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Equipment, BookingForm } from '../../model/entity';
import { EquipmentStatus } from '../../util';
import { DatePeriodRange } from '../../model/common';
import { EquipmentType} from '../../util';
import { BookingService } from './booking.service';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipRepository: Repository<Equipment>,
    @Inject(BookingService)
    private readonly formService: BookingService,
  ) {}

  async findAllEquip() {
    return await this.equipRepository.find();
  }

  async findEquipByID(equipID: string) {
    return await this.equipRepository.findOne(equipID);
  }

  async findAvailableEquipment(
    searchRange: DatePeriodRange,
    selectedEquip: EquipmentType,
  ) {
    // 所有Available的equipments
    const equipmentNeeded = await this.equipRepository.find({
      status: EquipmentStatus.Available,
      type: selectedEquip,
    });

    // 時間範圍通過的bookingForm以及其需要的設備
    const passedForms = await this.formService.findApprovedFormByTimeRange(
      searchRange,
      ['equipments'],
    );
    
    // 挑出可用的設備
    const availEqiup: Equipment[] = [];
    for (const equip of equipmentNeeded) {
      let avail = true;
      for (const passedForm of passedForms) {
        for (const equipInUse of passedForm.equipments) {
          if (equip.id === equipInUse.id) {
            avail = false;
            break;
          }
        }
        if (!avail) break;
      }
      if (avail) {
        availEqiup.push(equip);
      }
    }
    return availEqiup;
  }

  // async changeEqiupStatus(equipID: string){
  //   let targetEqiup=this.equipRepository.findOne(equipID);
  // }
}
