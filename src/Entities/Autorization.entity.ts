import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserClient } from './userClient.entity';

@Entity('autorizacion')
export class Autorization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url_firma: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true, length: 250 })
  observaciones: string;

  @OneToOne(() => UserClient, (uc) => uc.autorizacion)
  userClient: UserClient;
}
