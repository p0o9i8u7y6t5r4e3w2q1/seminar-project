import { Injectable, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
}
