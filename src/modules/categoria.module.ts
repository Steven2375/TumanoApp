import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/Entities/categoria.entity';
import { CategoriaContexto } from 'src/Entities/categoriaContexto.entity';
import { DatosCategoria } from 'src/Entities/datoCategoria';
import { CategoriasService } from 'src/services/categoria.service';
import { CategoriasController } from 'src/controllers/categoria.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, DatosCategoria, CategoriaContexto]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
