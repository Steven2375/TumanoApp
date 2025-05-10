import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Categoria } from 'src/Entities/categoria.entity';

export interface CategoriasAgrupadas {
  dispositivos: {
    categoriasDispositivo: {
      id: number;
      nombre: string;
      valores: { id: number; nombre: string }[];
    }[];
  };
  areas: {
    categoriasArea: {
      id: number;
      nombre: string;
      valores: { id: number; nombre: string }[];
    }[];
  };
}

// Define una interfaz para los resultados de la consulta
interface ResultadoConsulta {
  categoria_id: number;
  categoria_nombre: string;
  diccionario_id: number;
  diccionario_valor: string;
  contexto_aplica_a: string;
}

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    private dataSource: DataSource,
  ) {}

  async obtenerCategorias(): Promise<CategoriasAgrupadas> {
    try {
      const resultados: ResultadoConsulta[] = await this.dataSource
        .createQueryBuilder(Categoria, 'cat')
        .select([
          'cat.id AS categoria_id',
          'cat.nombre AS categoria_nombre',
          'dc.id AS diccionario_id',
          'dc.valor AS diccionario_valor',
          'cc.aplica_a AS contexto_aplica_a',
        ])
        .leftJoin('dato_categoria', 'dc', 'cat.id = dc.categoria_id')
        .leftJoin('categoria_contexto', 'cc', 'cat.id = cc.categoria_id')
        .orderBy('cat.id, dc.id')
        .getRawMany();
      console.log(resultados);
      const categoriasAgrupadas: CategoriasAgrupadas = {
        dispositivos: { categoriasDispositivo: [] },
        areas: { categoriasArea: [] },
      };

      const dispositivosMap: Map<
        number,
        {
          id: number;
          nombre: string;
          valores: { id: number; nombre: string }[];
        }
      > = new Map();
      const areasMap: Map<
        number,
        {
          id: number;
          nombre: string;
          valores: { id: number; nombre: string }[];
        }
      > = new Map();

      for (const resultado of resultados) {
        if (resultado.contexto_aplica_a === 'Dispositivo') {
          if (!dispositivosMap.has(resultado.categoria_id)) {
            dispositivosMap.set(resultado.categoria_id, {
              id: resultado.categoria_id,
              nombre: resultado.categoria_nombre,
              valores: [],
            });
          }
          if (resultado.diccionario_valor) {
            dispositivosMap.get(resultado.categoria_id)!.valores.push({
              id: resultado.diccionario_id,
              nombre: resultado.diccionario_valor,
            });
          }
        } else if (resultado.contexto_aplica_a === 'Área') {
          if (!areasMap.has(resultado.categoria_id)) {
            areasMap.set(resultado.categoria_id, {
              id: resultado.categoria_id,
              nombre: resultado.categoria_nombre,
              valores: [],
            });
          }
          if (resultado.diccionario_valor) {
            areasMap.get(resultado.categoria_id)!.valores.push({
              id: resultado.diccionario_id,
              nombre: resultado.diccionario_valor,
            });
          }
        }
      }

      categoriasAgrupadas.dispositivos.categoriasDispositivo = Array.from(
        dispositivosMap.values(),
      ).map((cat) => ({
        id: cat.id,
        nombre: cat.nombre,
        valores: cat.valores,
      }));

      categoriasAgrupadas.areas.categoriasArea = Array.from(
        areasMap.values(),
      ).map((cat) => ({
        id: cat.id,
        nombre: cat.nombre,
        valores: cat.valores,
      }));

      return categoriasAgrupadas;
    } catch (error) {
      console.error(
        'Error al obtener las categorías con detalles (JOIN y selección):',
        error,
      );
      throw new Error(
        'No se pudieron obtener las categorías con detalles (JOIN y selección).',
      );
    }
  }
}
