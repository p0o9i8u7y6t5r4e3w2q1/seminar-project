import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ScheduleModule } from '../schedule/schedule.module';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingForm } from '../../model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingForm]), ScheduleModule],
  controllers: [BookingController],
  providers: [BookingService, EquipmentService],
})
export class BookingModule {}
