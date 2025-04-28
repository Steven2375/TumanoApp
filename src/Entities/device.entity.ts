import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserDevice } from './userDevice';

@Entity('dispositivos')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sistema_operativo: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @OneToMany(
    () => UserDevice,
    (usuarioDispositivo) => usuarioDispositivo.dispositivo,
  )
  usuarioDispositivos: UserDevice[];
}
