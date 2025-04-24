import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El numero de identificacion es requerido' })
  identificacion_numero: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  contrasena_hash: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  correo_electronico: string;

  @IsNumber({}, { message: 'El ID de rol debe ser un número' })
  @IsNotEmpty({ message: 'El ID de rol es requerido' })
  rol_id: number;
}
