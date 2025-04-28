import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasClient.entity';

@Entity('insumos')
export class Insumos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id', nullable: false })
  cliente_id: number;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;
}
