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
import { CategoriasModule } from './modules/categoria.module';
import { Categoria } from './Entities/categoria.entity';
import { CategoriaContexto } from './Entities/categoriaContexto.entity';
import { DatosCategoria } from './Entities/datoCategoria';
import { CheckList } from './Entities/checkList.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserClientModule,
    CategoriasModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST,
      port: Number(process.env.BD_PORT),
      username: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_NAME,
      entities: [
        User,
        Role,
        UserClient,
        Service,
        Autorization,
        Client,
        UserDevice,
        Device,
        Categoria,
        CategoriaContexto,
        DatosCategoria,
        CheckList,
      ],
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
})
export class AppModule {}
