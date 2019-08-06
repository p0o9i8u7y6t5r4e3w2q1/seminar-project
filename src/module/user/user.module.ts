import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User } from '../../model/entity';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([TA, User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy, SessionSerializer],
  exports: [UserService],
})
export class UserModule {}
