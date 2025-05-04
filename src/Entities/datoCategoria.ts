import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity('dato_categoria')
export class DatosCategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'valor', nullable: false })
  valor: string;

  @OneToMany(() => Categoria, (cd) => cd.datosCategorias)
  categorias: Categoria[];
}
