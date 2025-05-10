import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AreasClient } from './areasCliente.entity';
import { DatosCategoria } from './datoCategoria';

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

  @Column({ name: 'url_dispositivo', nullable: false })
  urlDispositivo: string;

  @ManyToOne(() => AreasClient, { nullable: false })
  @JoinColumn({ name: 'areacliente_id' })
  areacliente: AreasClient;

  @ManyToOne(() => DatosCategoria, { nullable: false })
  @JoinColumn({ name: 'dato_categoria_id' })
  dato_categoria: DatosCategoria;
}
