import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User, Role } from '../../model/entity';
import { LoginAuthService } from './login-auth/login-auth.service';
import { LocalStrategy } from './login-auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './login-auth/session.serializer';
import { RolesGuard } from './guard/roles.guard';
import { UserTestController } from './user.test.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TA, User, Role]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UserController, UserTestController],
  providers: [
    UserService,
    LoginAuthService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
