import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasCliente.entity';

@Entity('insumos')
export class Insumos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id', nullable: false })
  cliente_id: number;
  @Column({ name: 'nombre', nullable: false })
  nombre: string;
  @Column({ name: 'unidad_medida', nullable: false })
  unidad_medida: string;
  @Column({ name: 'cantidad', nullable: false })
  cantidad: number;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;
}
