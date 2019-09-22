import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsValidIdConstraint {
  async validate(id: string, args: ValidationArguments) {
    const type = args.constraints[0];
    return findEntity(type, id).then(data => data != null);
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.constraints[0];
    return `($value) not exist in ${type.name}!`;
  }
}

export function IsValidId(type: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [type],
      validator: IsValidIdConstraint,
    });
  };
}

export function findEntity(type: any, id: string, relations?: string[]) {
  return getManager().findOne(type, id, { relations });
}
