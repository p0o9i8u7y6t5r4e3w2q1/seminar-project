import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class ParseDatePipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<any> {
    const date = new Date(value);
    const validator = new Validator();

    if (validator.isDate(date)) {
      return date;
    } else {
      return new BadRequestException('is not Date type string');
    }
  }
}
