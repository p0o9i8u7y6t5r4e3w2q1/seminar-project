import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { DatePeriodRangeDto } from '../dto/date-period-range.dto';
import { DatePeriodRange } from '../../../model/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: DatePeriodRangeDto, metadata: ArgumentMetadata): DatePeriodRange {
    return new DatePeriodRange(value);
  }
}
