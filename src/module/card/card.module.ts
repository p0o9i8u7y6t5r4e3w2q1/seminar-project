import { Module } from '@nestjs/common';
import { ScheduleModule } from '../schedule/schedule.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRecord } from '../../model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardRecord]), ScheduleModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
