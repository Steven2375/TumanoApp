import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity('categoria_contexto')
export class CategoriaContexto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'aplica_a', type: 'varchar' })
  aplicaA: string;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
