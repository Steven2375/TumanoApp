// login.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UbicacionDto {
  @IsNotEmpty()
  @IsNumber()
  latitud: number;

  @IsNotEmpty()
  @IsNumber()
  longitud: number;

  @IsOptional()
  @IsNumber()
  precision?: number;

  @IsNotEmpty()
  @IsString()
  timestamp?: string;
}

export class UpdateAreasClienteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  cliente_id: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}
