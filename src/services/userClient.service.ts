import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserClient } from 'src/Entities/userClient.entity';

interface RawData {
  cliente_nombre: string;
  cliente_industria: string;
  cliente_fechaR: string; // O el tipo de fecha que esperas
  servicio_nombre: string;
  area_nombre: string;
  area_estado: string;
  i_areacliente_id: number | null; // Permitimos null porque puede no existir
  dpa_areaclienteId: number | null; // Permitimos null porque puede no existir
  dpa_diccionarioHallazgos: number | null; // Permitimos null porque puede no existir
  // ... incluye cualquier otra propiedad que pueda venir de la consulta
}

@Injectable()
export class UserClientService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async obtenerAgenda(usuario_id: number, fecha: Date) {
    const inicioDia = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      0,
      0,
      0,
    );
    const finDia = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      23,
      59,
      59,
      999,
    );

    // Se crea y guarda el query builder en una variable
    const queryBuilder = this.dataSource
      .createQueryBuilder(UserClient, 'uc')
      .select([
        'c.nombre AS cliente_nombre', //AGENDA
        'c.industria AS cliente_industria',
        `TO_CHAR(c.fecha_registro, 'YYYY-MM-DD HH24:MI:SS') AS cliente_fechaR`,
        's.nombre AS servicio_nombre',
        'ac.nombre AS area_nombre',
        'ac.estado AS area_estado',
        'i.areacliente_id AS i_areacliente_id',
        'dpa.areacliente_id AS dpa_areaclienteId',
        'dpa.diccionario_hallazgos_id AS dpa_diccionarioHallazgos',
      ])
      .leftJoin('clientes', 'c', 'c.id = uc.cliente_id')
      .leftJoin('servicio', 's', 's.id = c.servicio_id')
      .leftJoin('areascliente', 'ac', 'ac.cliente_id = c.id')
      .leftJoin('insumos', 'i', 'i.areacliente_id =  ac.id')
      .leftJoin('dispositivos_area', 'dpa', 'dpa.areacliente_id = ac.id')
      .where('uc.usuario_id = :usuario_id', { usuario_id })
      .andWhere('uc.fecha BETWEEN :inicio AND :fin', {
        inicio: inicioDia.toISOString(),
        fin: finDia.toISOString(),
      });

    // const [sql, params] = queryBuilder.getQueryAndParameters();
    // console.log('Consulta SQL:', sql);
    // console.log('Parámetros:', params);

    // Ejecutar consulta
    const datos: RawData[] = await queryBuilder.getRawMany();
    const respuesta = datos.map((datos) => ({
      cliente: {
        nombre: datos.cliente_nombre,
        industria: datos.cliente_industria,
        fecha_registro: datos.cliente_fechaR,
        servicio: datos.servicio_nombre,
        area: {
          nombre: datos.area_nombre,
          estado: datos.area_estado,
          insumos: datos.i_areacliente_id
            ? [{ area_cliente_id: datos.i_areacliente_id }]
            : [],
          dispositivos: datos.dpa_areaclienteId
            ? [
                {
                  area_cliente_id: datos.dpa_areaclienteId,
                  diccionario_hallazgos_id: datos.dpa_diccionarioHallazgos,
                },
              ]
            : [],
        },
      },
    }));
    return respuesta;
  }
}
