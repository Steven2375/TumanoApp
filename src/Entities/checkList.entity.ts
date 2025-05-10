import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('check_list')
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item', nullable: true })
  item: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'clientes_id' })
  clientes_id: number;

  @ManyToOne(() => Client, (cliente) => cliente.checkLists)
  @JoinColumn({ name: 'clientes_id' })
  cliente: Client;
}
