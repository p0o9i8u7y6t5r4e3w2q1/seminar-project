import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ScheduleModule } from '../schedule';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../../model/entity';
import { BookingFormRepository } from '../../model/repository';
import { UserModule } from '../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingFormRepository, Equipment]),
    ScheduleModule,
    UserModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, EquipmentService],
})
export class BookingModule {}
