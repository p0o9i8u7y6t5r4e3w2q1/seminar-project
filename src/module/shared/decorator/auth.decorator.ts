import { Auth } from '../../../util';
import { SetMetadata } from '@nestjs/common';

export const PassAuth = (auth: Auth) => SetMetadata('auth', auth);
