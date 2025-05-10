import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasCliente.entity';
import { DatosCategoria } from './datoCategoria';

@Entity('hallazgos')
export class Hallazgos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'areacliente_id', nullable: false })
  areacliente_id: number;

  @Column({ name: 'diccionario_hallazgos_id', nullable: false })
  dicHallazgos_id: number;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;

  @ManyToOne(() => DatosCategoria, { nullable: false })
  @JoinColumn({ name: 'diccionario_hallazgos_id' })
  diccionario: DatosCategoria;
}
