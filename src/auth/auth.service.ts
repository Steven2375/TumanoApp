import { HttpException, Injectable, HttpCode } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from './Dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Entities/user.entity';
import { LoginDto } from './Dto/login.dto';
import { JwtService } from '@nestjs/jwt';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtAuthService: JwtService,
  ) {}

  // Función para el registro de usuario (signUp)
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { contrasena_hash } = createUserDto;

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await this.hashPassword(contrasena_hash);

    // Crear el nuevo usuario con la contraseña hasheada
    return this.userService.createUser({
      ...createUserDto,
      contrasena_hash: hashedPassword,
    });
  }

  // Función privada para hashear la contraseña
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds); // Se usa bcrypt para crear el hash de la contraseña
  }

  // Función para el login (inicio de sesión)
  @HttpCode(201)
  async sigIn(loginDto: LoginDto) {
    const { CC, pasw, ubicacion, SO, Modelo, Imei } = loginDto;

    // Buscar el usuario por número de identificación
    const usuario = await this.userService.findByIdNumber(parseInt(CC));

    // Si no existe, lanzar excepción
    if (!usuario) {
      throw new HttpException('Credenciales invalidas', 401);
    }

    // Validar la contraseña con bcrypt
    const validPassword = await bcrypt.compare(pasw, usuario.contrasena_hash);

    // Si la contraseña no es válida
    if (!validPassword) {
      throw new HttpException('Credenciales invalidas', 401);
    }

    await this.userService.actualizarFechaLogin(usuario.id);
    await this.userService.guardarInformacionDispositivo(
      usuario.id,
      SO,
      Modelo,
      Imei,
    );
    await this.userService.guardarUbicacion(usuario.id, ubicacion);

    const payload = {
      id: usuario.id,
      name: usuario.nombre_usuario,
      imei: Imei,
    };
    const token = this.jwtAuthService.sign(payload);

    const userResponse: UserResponse = {
      id: usuario.id,
      name: usuario.nombre_usuario,
      email: usuario.correo_electronico,
    };

    // Login exitoso
    return {
      token,
      userResponse,
    };
  }
}
