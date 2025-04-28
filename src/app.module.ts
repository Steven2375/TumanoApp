import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/user.entity';
import { Role } from './Entities/rol.entity';
import 'dotenv/config';
import { UserClient } from './Entities/userClient.entity';
import { Service } from './Entities/service.entity';
import { Autorization } from './Entities/Autorization.entity';
import { Client } from './Entities/client.entity';
import { UserClientModule } from './modules/userClient.module';
import { UserDevice } from './Entities/userDevice';
import { Device } from './Entities/device.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserClientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST,
      port: Number(process.env.BD_PORT), // Puerto de PostgreSQL (por defecto es 5432)
      username: process.env.BD_USER, // Usuario de la base de datos
      password: process.env.BD_PASSWORD, // Contraseña de la base de datos
      database: process.env.BD_NAME, // Nombre de la base de datos
      entities: [
        User,
        Role,
        UserClient,
        Service,
        Autorization,
        Client,
        UserDevice,
        Device,
      ],
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
})
export class AppModule {}
