import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasClient.entity';
import { DiccionarioHallazgos } from './diccionarioHallazgos.entity';

@Entity('dispositivos_area')
export class DispositivosArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'areacliente_id', nullable: false })
  areacliente_id: number;

  @Column({ name: 'diccionario_hallazgos_id', nullable: false })
  dicHallazgos_id: number;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;

  @ManyToOne(() => DiccionarioHallazgos, { nullable: false })
  @JoinColumn({ name: 'diccionario_hallazgos_id' })
  diccionario: DiccionarioHallazgos;
}
