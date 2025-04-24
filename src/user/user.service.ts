import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/auth/Dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepo.find({
      select: [
        'id',
        'nombre_usuario',
        'correo_electronico',
        'fecha_creacion',
        'fecha_ultimo_login',
        'rol_id',
      ],
    });
    if (users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios');
    }
    return users; // Retorna todos los usuarios
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const nuevoUsuario = this.userRepo.create(createUserDto);

    //Validar numero de identificacion no existente
    if (
      await this.userRepo.findOne({
        where: {
          identificacion_numero: createUserDto.identificacion_numero,
        },
      })
    ) {
      throw new BadRequestException(
        'Ya existe un usuario con este numero de identificacion',
      );
    }

    //Validar Nombre de usuario no existente
    if (
      await this.userRepo.findOne({
        where: {
          nombre_usuario: createUserDto.nombre_usuario,
        },
      })
    ) {
      throw new BadRequestException('Ya existe un usuario con este nombre');
    }

    //Validar correo electronico no existente
    if (
      await this.userRepo.findOne({
        where: {
          correo_electronico: createUserDto.correo_electronico,
        },
      })
    ) {
      throw new BadRequestException(
        'Ya existe un usuario con este correo electronico',
      );
    }

    return this.userRepo.save(nuevoUsuario);
  }

  async findByIdNumber(identificacion_numero: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { identificacion_numero },
    });
    return user;
  }

  async actualizarFechaLogin(id: number): Promise<User> {
    const usuario = await this.userRepo.findOne({ where: { id } });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.fecha_ultimo_login = new Date(); // Asignamos la fecha actual como timestamp

    return await this.userRepo.save(usuario); // Guardamos los cambios
  }
}
