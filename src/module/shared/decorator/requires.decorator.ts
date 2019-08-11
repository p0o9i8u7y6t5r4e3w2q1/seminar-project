import { SetMetadata } from '@nestjs/common';

/**
 * 設定可通行角色
 * @link https://docs.nestjs.com/guards
 */
export const Requires = (...roles: string[][]) =>
  SetMetadata('roles', roles);
