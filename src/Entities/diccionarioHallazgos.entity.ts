import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { CategoriasDiccionario } from './categoriaDiccionario.entity';

@Entity('diccionario_hallazgos')
export class DiccionarioHallazgos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo', nullable: false })
  codigo: string;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', nullable: false })
  descripcion: string;
  @Column({ name: 'tipo', nullable: false })
  tipo: string;

  @Column({ name: 'categoria_id', nullable: false })
  categoridaId: string;

  @Column({ name: 'fecha_registro', nullable: false })
  fecha: Timestamp;

  @OneToMany(() => CategoriasDiccionario, (cd) => cd.diccionario)
  categoriasDiccionario: CategoriasDiccionario[];
}
