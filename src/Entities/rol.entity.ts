import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity'; // Relación con la entidad de usuarios

@Entity('roles') // Nombre de la tabla en la base de datos
export class Role {
  @PrimaryGeneratedColumn()
  id: number; // Clave primaria

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string; // Nombre del rol (único)

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string; // Descripción del rol

  // Relación con los usuarios (un rol puede tener muchos usuarios)
  @OneToMany(() => User, (usuario) => usuario.rol_id)
  usuarios: User[];
}
