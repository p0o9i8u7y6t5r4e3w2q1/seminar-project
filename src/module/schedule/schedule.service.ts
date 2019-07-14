import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleChange } from '../../model/entity/schedule-change.entity';

@Injectable()
export class ScheduleService {
  
  constructor(
    private readonly schgRepository:Repository<ScheduleChange>
  ) {}

  createScheduleChange() {
  }
  
}
