import { ReflectMetadata } from '@nestjs/common';

// nestjs example
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
