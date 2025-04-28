import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { UserClient } from './userClient.entity';

@Entity('clientes')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  industria: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @Column({ nullable: true })
  tiemporeingreso: number;

  @ManyToOne(() => Service, (service) => service.clients)
  @JoinColumn({ name: 'servicio_id' })
  servicio_id: Service;

  @OneToMany(() => UserClient, (uc) => uc.cliente)
  userClients: UserClient[];
}
