import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('areascliente')
export class AreasClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;
  @Column({ name: 'estado', nullable: false })
  estado: boolean;
  @Column({ name: 'cliente_id', nullable: false })
  cliente_id: number;

  @ManyToOne(() => Client, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  client: Client;
}
