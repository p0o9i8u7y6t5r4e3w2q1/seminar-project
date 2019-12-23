import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import { checkIdExists } from '../shared.function';

// 暫不提供需要自定義repository才能驗證的id
// from https://stackoverflow.com/questions/49709429/decorator-to-return-a-404-in-a-nest-controller
@ValidatorConstraint({ async: true })
export class IdNotExistsConstraint {
  async validate(ids: string | string[], args: ValidationArguments) {
    const type = args.constraints[0];
    return checkIdExists(type, ids).then(result => !result);
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.constraints[0];
    return `${args.property} should not exist in database`;
  }
}

export function IdNotExists(type: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [type],
      validator: IdNotExistsConstraint,
    });
  };
}
