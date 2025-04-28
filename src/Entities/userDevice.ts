import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';

@Entity('usuarios_dispositivos')
export class UserDevice {
  @PrimaryColumn({ name: 'usuario_id' })
  usuarioId: number;

  @PrimaryColumn({ name: 'dispositivo_id' })
  dispositivoId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'fecha_login',
  })
  fechaLogin: Date;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'direccion_ip' })
  direccionIp: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'latitud' })
  latitud: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'longitud' })
  longitud: string;

  @ManyToOne(() => User, (usuario) => usuario.usuarioDispositivos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => Device, (dispositivo) => dispositivo.usuarioDispositivos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dispositivo_id' })
  dispositivo: Device;
}
