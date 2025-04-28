import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/Entities/rol.entity';
import { User } from '../Entities/user.entity';
import { UserClient } from 'src/Entities/userClient.entity';
import { UserDevice } from 'src/Entities/userDevice';
import { Device } from 'src/Entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserClient, UserDevice, Device]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
