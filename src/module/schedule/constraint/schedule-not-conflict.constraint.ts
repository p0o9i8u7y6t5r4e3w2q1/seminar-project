import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ClassroomScheduleService } from '../classroom-schedule.service';
import { DatePeriodRangeDto } from '../../shared';

@ValidatorConstraint({ name: 'scheduleNotConflict', async: true })
@Injectable()
export class ScheduleNotConflictConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(ClassroomScheduleService)
    private readonly service: ClassroomScheduleService,
  ) {}

  async validate(timeRange: DatePeriodRangeDto, args: ValidationArguments) {
    const classroomID: string = args.object['classroomID'];
    return this.service
      .isConflict(classroomID, timeRange)
      .then(result => !result);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not conflict`;
  }
}
