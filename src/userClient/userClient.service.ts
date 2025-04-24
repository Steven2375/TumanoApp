import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserClient } from 'src/Entities/userClient.entity';

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

    // 👇 Se crea y guarda el query builder en una variable
    const queryBuilder = this.dataSource
      .createQueryBuilder(UserClient, 'uc')
      .select([
        'uc.id AS id',
        'uc.cliente_id AS cliente_id',
        'uc.estado AS estado', //AGENDA
        'uc.usuario_id AS usuario_id',
        `TO_CHAR(uc.fecha, 'YYYY-MM-DD HH24:MI:SS') AS fecha`,
        'uc.autorizacion_id AS autorizacion_id',
        'c.nombre AS cliente_nombre', // Nombre del cliente' //AGENDA
        'c.industria AS cliente_industria', // Industria del cliente'
        `TO_CHAR(c.fecha_registro, 'YYYY-MM-DD HH24:MI:SS') AS cliente_fechaR`,
      ])
      .leftJoin('clientes', 'c', 'c.id = uc.cliente_id') // Usamos LEFT JOIN para no excluir los registros sin cliente
      .where('uc.usuario_id = :usuario_id', { usuario_id })
      .andWhere('uc.fecha BETWEEN :inicio AND :fin', {
        inicio: inicioDia.toISOString(),
        fin: finDia.toISOString(),
      });

    const [sql, params] = queryBuilder.getQueryAndParameters();
    console.log('Consulta SQL:', sql);
    console.log('Parámetros:', params);

    // Ejecutar consulta
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await queryBuilder.getRawMany();
  }
}
