import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import { Period } from '../../../util';

@ValidatorConstraint({ async: false })
export class PeriodNotGreaterThanConstraint {
  validate(startPeriod: string, args: ValidationArguments) {
    const endPeriod = args.object[args.constraints[0]];
    return Period.indexOf(startPeriod) <= Period.indexOf(endPeriod);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not greater than ${args.constraints[0]}`;
  }
}

export function PeriodNotGreaterThan(endPeriodProperty: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [endPeriodProperty],
      validator: PeriodNotGreaterThanConstraint,
    });
  };
}
