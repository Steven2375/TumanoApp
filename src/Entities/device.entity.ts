import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserDevice } from './userDevice';

@Entity('dispositivo_movil')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modelo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sistema_operativo: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  IMEI: string;

  @OneToMany(
    () => UserDevice,
    (usuarioDispositivo) => usuarioDispositivo.dispositivoMovil,
  )
  usuarioDispositivos: UserDevice[];
}
