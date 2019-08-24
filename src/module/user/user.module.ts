import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User, Role, Teacher } from '../../model/entity';
import { PassportModule } from '@nestjs/passport';
import { UserTestController } from './user.test.controller';
import { LoginAuthService, LocalStrategy } from './login-auth';
import { TokenService, JwtStrategy, jwtConstants, JwtInterceptor } from './jwt';
import { LoginGuard, AuthenticatedGuard, RolesGuard } from './guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TA, User, Role, Teacher]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [UserController, UserTestController],
  providers: [
    UserService,
    LoginAuthService,
    LocalStrategy,
    JwtStrategy,
    LoginGuard,
    AuthenticatedGuard,
    RolesGuard,
    TokenService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptor,
    },
  ],
  exports: [
    UserService,
    TokenService,
    LoginGuard,
    AuthenticatedGuard,
    RolesGuard,
  ],
})
export class UserModule {}
