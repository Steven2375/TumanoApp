import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClient } from 'src/Entities/userClient.entity';
import { UserClientController } from '../controllers/userClient.controller';
import { UserClientService } from '../services/userClient.service';
import { UserDevice } from 'src/Entities/userDevice';
import { Device } from 'src/Entities/device.entity';
import { CheckList } from 'src/Entities/checkList.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserClient, UserDevice, Device, CheckList]),
  ],
  controllers: [UserClientController],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
