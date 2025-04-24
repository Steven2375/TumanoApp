import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from './client.entity';

@Entity('servicio')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @OneToMany(() => Client, (clients) => clients.servicio_id)
  clients: Client[];
}
