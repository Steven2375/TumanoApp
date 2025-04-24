import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/Entities/rol.entity';
import { User } from './user.entity';
import { UserClient } from 'src/Entities/userClient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserClient])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
