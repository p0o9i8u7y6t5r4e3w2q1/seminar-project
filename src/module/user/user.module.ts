import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User } from '../../model/entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([TA, User])],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [AuthService, UserService],
})
export class UserModule {}
