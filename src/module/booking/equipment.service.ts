import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Equipment } from '../../model/entity';
import { EquipmentStatus } from '../../util';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipRepository: Repository<Equipment>,
  ) {}

  async findAllEquip() {
    return await this.equipRepository.find();
  }

  async findEquipByID(equipID: string) {
    return await this.equipRepository.findOne(equipID);
  }
}
