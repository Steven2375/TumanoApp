import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DatosCategoria } from './datoCategoria';
import { CategoriaContexto } from './categoriaContexto.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;

  @OneToMany(() => DatosCategoria, (datoCategoria) => datoCategoria.categorias)
  datosCategorias: DatosCategoria[];

  @OneToMany(
    () => CategoriaContexto,
    (categoriaContexto) => categoriaContexto.categoria,
  )
  categoriaContextos: CategoriaContexto[];
}
