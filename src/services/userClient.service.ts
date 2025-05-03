import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserClient } from 'src/Entities/userClient.entity';

interface RawData {
  cliente_id: string;
  cliente_nombre: string;
  cliente_industria: string;
  cliente_fechaR: string; // O el tipo de fecha que esperas
  servicio_nombre: string;
  area_cliente_id: number;
  area_nombre: string;
  area_estado: string;
  insumo_id: number;
  i_areacliente_id: number; // Permitimos null porque puede no existir
  i_nombre: string;
  i_unidad_medida: string;
  i_cantidad: number;
  dpla_areaclienteid: number; // Permitimos null porque puede no existir
  dpla_diccionarioHallazgos: number | null;
  dispositivo_id: string;
  dpla_codigo: string;
  dpla_estado: string;
  dpla_clase_dispositivo_id: string;
  // Permitimos null porque puede no existir
  // ... incluye cualquier otra propiedad que pueda venir de la consulta
}

export interface ClienteAgrupado {
  id: string;
  nombre: string;
  industria: string;
  fecha_registro: string;
  servicio: string;
  areas: {
    id: number;
    nombre: string;
    estado: string;
    insumos: {
      nombre: string;
      unidad_medida: string;
      cantidad: number;
      area_cliente_id: number;
    }[];
    dispositivos: {
      id: string;
      area_cliente_id: number;
      diccionario_hallazgos_id: number | null;
      codigo: string;
      estado: string;
      clase_dispositivo_plaga_id: string;
    }[];
  }[];
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
        'c.id AS cliente_id', //AGENDA
        'c.nombre AS cliente_nombre', //AGENDA
        'c.industria AS cliente_industria',
        `TO_CHAR(c.fecha_registro, 'YYYY-MM-DD HH24:MI:SS') AS cliente_fechaR`,
        's.nombre AS servicio_nombre',
        'ac.id AS area_cliente_id',
        'ac.nombre AS area_nombre',
        'ac.estado AS area_estado',
        'i.id AS insumo_id',
        'i.areacliente_id AS i_areacliente_id',
        'i.nombre AS i_nombre',
        'i.unidad_medida AS i_unidad_medida',
        'i.cantidad AS i_cantidad',
        'dpla.areacliente_id AS dpla_areaclienteId',
        'dpla.diccionario_hallazgos_id AS dpla_diccionarioHallazgos',
        'dpla.id AS dispositivo_id',
        'dpla.codigo AS dpla_codigo',
        'dpla.estado AS dpla_estado',
        'dpla.clase_dispositivo_plaga_id AS dpla_clase',
      ])
      .leftJoin('clientes', 'c', 'c.id = uc.cliente_id')
      .leftJoin('servicio', 's', 's.id = c.servicio_id')
      .leftJoin('areascliente', 'ac', 'ac.cliente_id = c.id')
      .leftJoin('insumos', 'i', 'i.areacliente_id =  ac.id')
      .leftJoin('dispositivos_plagas', 'dpla', 'dpla.areacliente_id = ac.id')
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
    const clientesAgrupados: { [clienteId: string]: ClienteAgrupado } = {};

    for (const dato of datos) {
      if (!clientesAgrupados[dato.cliente_id]) {
        clientesAgrupados[dato.cliente_id] = {
          id: dato.cliente_id,
          nombre: dato.cliente_nombre,
          industria: dato.cliente_industria,
          fecha_registro: dato.cliente_fechaR,
          servicio: dato.servicio_nombre,
          areas: [],
        };
      }

      const clienteAgrupado = clientesAgrupados[dato.cliente_id];
      let areaExistente = clienteAgrupado.areas.find(
        (area) => area.id === dato.area_cliente_id, // Usamos el ID del área para la comparación
      );

      if (!areaExistente && dato.area_cliente_id) {
        areaExistente = {
          id: dato.area_cliente_id,
          nombre: dato.area_nombre,
          estado: dato.area_estado,
          insumos: [],
          dispositivos: [],
        };
        clienteAgrupado.areas.push(areaExistente);
      }

      if (areaExistente) {
        // Procesar insumos
        if (dato.insumo_id) {
          const insumoExistente = areaExistente.insumos.find(
            (insumo) =>
              insumo.area_cliente_id === dato.i_areacliente_id &&
              insumo.nombre === dato.i_nombre,
          );
          if (!insumoExistente) {
            areaExistente.insumos.push({
              nombre: dato.i_nombre,
              unidad_medida: dato.i_unidad_medida,
              cantidad: dato.i_cantidad,
              area_cliente_id: dato.i_areacliente_id,
            });
          }
        }

        // Procesar dispositivos
        if (dato.dispositivo_id) {
          const dispositivoExistente = areaExistente.dispositivos.find(
            (dispositivo) => dispositivo.id === dato.dispositivo_id,
          );
          if (!dispositivoExistente) {
            areaExistente.dispositivos.push({
              id: dato.dispositivo_id,
              area_cliente_id: dato.dpla_areaclienteid,
              diccionario_hallazgos_id: dato.dpla_diccionarioHallazgos,
              codigo: dato.dpla_codigo,
              estado: dato.dpla_estado,
              clase_dispositivo_plaga_id: dato.dpla_clase_dispositivo_id,
            });
          }
        }
      }
    }

    const resultadoMapeado = Object.values(clientesAgrupados).map(
      (cliente) => ({
        id: cliente.id,
        nombre: cliente.nombre,
        industria: cliente.industria,
        fecha_registro: cliente.fecha_registro,
        servicio: cliente.servicio,
        areas: cliente.areas.map((area) => ({
          nombre: area.nombre,
          estado: area.estado,
          insumos: area.insumos.map((insumo) => ({
            nombre: insumo.nombre,
            unidad_medida: insumo.unidad_medida,
            cantidad: insumo.cantidad,
          })),
          dispositivos: area.dispositivos.map((dispositivo) => ({
            id: dispositivo.id,
            diccionario_hallazgos_id: dispositivo.diccionario_hallazgos_id,
            codigo: dispositivo.codigo,
            estado: dispositivo.estado,
            clase_dispositivo_plaga_id: dispositivo.clase_dispositivo_plaga_id,
          })),
        })),
      }),
    );

    return resultadoMapeado;
  }
}
