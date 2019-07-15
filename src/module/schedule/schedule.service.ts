import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleChange } from '../../model/entity/schedule-change.entity';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly schgRepository: Repository<ScheduleChange>,
    @Inject(forwardRef(() => BookingService))
    private readonly bookingService: BookingService,
  ) {}
}
