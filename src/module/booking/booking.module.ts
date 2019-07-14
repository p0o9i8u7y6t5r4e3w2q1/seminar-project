import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ScheduleModule } from '../schedule/schedule.module'

@Module({
  imports: [ScheduleModule],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
