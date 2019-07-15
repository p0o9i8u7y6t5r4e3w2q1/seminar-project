import { Module, forwardRef } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ScheduleModule } from '../schedule/schedule.module'

@Module({
  imports: [forwardRef(()=>ScheduleModule)],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
