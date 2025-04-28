import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './rol.entity';
import { UserClient } from 'src/Entities/userClient.entity';
import { UserDevice } from './userDevice';

@Entity('usuarios') // Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Clave primaria

  @Column({ name: 'identificacion_numero', nullable: false })
  identificacion_numero: number; // numero de identificacion asociado al usuario

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre_usuario: string; // Nombre de usuario (único)

  @Column({ type: 'varchar', length: 255 })
  correo_electronico: string; // Correo electrónico

  @Column({ type: 'varchar', length: 255 })
  contrasena_hash: string; // Contraseña hasheada

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date; // Fecha de creación del usuario

  @Column({ type: 'boolean', default: true })
  estado: boolean; // Estado del usuario (activo/inactivo)

  @Column({ type: 'timestamp', nullable: true })
  fecha_ultimo_login: Date; // Fecha de ultimo login del usuario

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Role; // Relacion con la tabla rol

  @Column({ name: 'rol_id', nullable: false })
  rol_id: number; // Rol id asociado al usuario

  @OneToMany(() => UserClient, (userClient) => userClient.usuario)
  userClients: UserClient[];

  @OneToMany(
    () => UserDevice,
    (usuarioDispositivo) => usuarioDispositivo.usuarioId,
  )
  usuarioDispositivos: UserDevice[];
}
