import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasClient.entity';
import { DiccionarioHallazgos } from './diccionarioHallazgos.entity';

@Entity('dispositivos_plagas')
export class DispositivosPlagas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'areacliente_id', nullable: false })
  areacliente_id: number;

  @Column({ name: 'diccionario_hallazgos_id', nullable: false })
  dicHallazgos_id: number;

  @Column({ name: 'codigo', nullable: false })
  codigo: string;

  @Column({ name: 'estado', nullable: false })
  estado: string;

  @Column({ name: 'clase_dispositivo_plaga_id', nullable: false })
  clase_id: string;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;

  @ManyToOne(() => DiccionarioHallazgos, { nullable: false })
  @JoinColumn({ name: 'diccionario_hallazgos_id' })
  diccionario: DiccionarioHallazgos;
}
