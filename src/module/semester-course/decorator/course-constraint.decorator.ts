import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import { findEntity } from '../../shared';
import { Course } from '../../../model/entity';

@ValidatorConstraint({ async: false })
export class CourseConstraint {
  async validate(courseID: string, args: ValidationArguments) {
    const courseName = args.object[args.constraints[0]];
    const course: Course = await findEntity(Course, courseID);
    args.constraints.push(course != null);
    if (course && !courseName) {
      return true;
    } else if (course && course.name === courseName) {
      args.object[args.constraints[0]] = null;
      return true;
    } else if (!course && courseName) {
      return true;
    } else {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const isCourseExists = args.constraints.pop();
    if (isCourseExists) {
      return `${args.constraints[0]} is not match ${args.property}'s name`;
    } else {
      return `${args.constraints[0]} is not exist to create new course`;
    }
  }
}

export function IsCourseValid(
  cNameProperty: any,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [cNameProperty],
      validator: CourseConstraint,
    });
  };
}
