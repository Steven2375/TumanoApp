import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Autorization } from './Autorization.entity';
import { User } from 'src/Entities/user.entity';

@Entity('usuario_cliente')
export class UserClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column({ default: true })
  estado: boolean;

  @Column()
  usuario_id: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha: Date;

  @Column()
  autorizacion_id: number;

  @ManyToOne(() => Client, (client) => client.userClients)
  cliente: Client;

  @OneToOne(() => Autorization, { nullable: true })
  @JoinColumn({ name: 'autorizacion_id' })
  autorizacion: Autorization;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
