import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../../util';

/**
 * 設定可通行角色
 * @link https://docs.nestjs.com/guards
 */
export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
