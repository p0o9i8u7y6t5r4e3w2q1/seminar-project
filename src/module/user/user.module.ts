import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TA, User } from '../../model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([TA, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
