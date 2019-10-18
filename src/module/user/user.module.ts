import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User, Role, Teacher } from '../../model/entity';
import { LoginAuthService } from './login-auth.service';
import { LoginGuard, AuthenticatedGuard, RolesGuard } from './guard';
import { SharedModule } from '../shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([TA, User, Role, Teacher]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    LoginAuthService,
    LoginGuard,
    AuthenticatedGuard,
    RolesGuard,
  ],
  exports: [
    UserService,
    LoginGuard,
    LoginAuthService,
    AuthenticatedGuard,
    RolesGuard,
  ],
})
export class UserModule {}
