// login.dto.ts
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @IsString()
  timestamp?: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  CC: string;

  @IsNotEmpty()
  @IsString()
  pasw: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UbicacionDto)
  ubicacion: UbicacionDto;

  @IsNotEmpty()
  @IsString()
  SO: string;

  @IsNotEmpty()
  @IsString()
  Modelo: string;

  @IsNotEmpty()
  @IsString()
  Imei: string;
}
