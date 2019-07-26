import { Module} from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ScheduleModule } from '../schedule/schedule.module';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [ScheduleModule],
  controllers: [BookingController],
  providers: [BookingService, EquipmentService],
})
export class BookingModule {}
