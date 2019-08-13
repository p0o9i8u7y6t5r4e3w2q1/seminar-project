import { Module } from '@nestjs/common';
import { ScheduleModule } from '../schedule';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CardRecord,
  BookingForm,
  SemesterCourse,
  Staff,
} from '../../model/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardRecord, BookingForm, SemesterCourse, Staff]),
    ScheduleModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
