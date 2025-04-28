import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DiccionarioHallazgos } from './diccionarioHallazgos.entity';

@Entity('categorias_diccionario')
export class CategoriasDiccionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', nullable: false })
  descripcion: string;

  @Column({ name: 'fecha_registro', nullable: false })
  fecha: Timestamp;

  @ManyToOne(() => DiccionarioHallazgos, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  diccionario: DiccionarioHallazgos;
}
