import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasClient } from 'src/Entities/areasCliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreasClient])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ActualizarInfoModule {}
