import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El numero de identificacion es requerido' })
  identificacion_numero: number;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  contrasena: string;
}
