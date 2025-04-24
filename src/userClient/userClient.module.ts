import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClient } from 'src/Entities/userClient.entity';
import { UserClientController } from './userClient.controller';
import { UserClientService } from './userClient.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserClient])],
  controllers: [UserClientController],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
