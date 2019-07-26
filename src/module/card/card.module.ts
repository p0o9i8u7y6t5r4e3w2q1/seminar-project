import { Module } from '@nestjs/common';
import { ScheduleModule } from '../schedule/schedule.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [ScheduleModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
