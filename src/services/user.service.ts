import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { CreateUserDto } from 'src/auth/Dto/user.dto';
import { UbicacionDto } from 'src/auth/Dto/login.dto';
import { Device } from 'src/Entities/device.entity';
import { UserDevice } from 'src/Entities/userDevice';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
    @InjectRepository(UserDevice)
    private userDeviceRepo: Repository<UserDevice>,
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

  async actualizarFechaLoginDevice(
    dispositivoMovilId: number,
  ): Promise<UserDevice> {
    const device = await this.userDeviceRepo.findOne({
      where: { dispositivoMovilId },
    });

    if (!device) {
      throw new Error('Dispositivo no encontrado');
    }

    device.fechaLogin = new Date(); // Asignamos la fecha actual como timestamp

    return await this.userDeviceRepo.save(device); // Guardamos los cambios
  }

  async guardarUbicacion(
    userId: number,
    ubicacion: UbicacionDto,
  ): Promise<UserDevice> {
    const usuarioDispositivo = await this.userDeviceRepo.findOne({
      where: { usuarioId: userId },
      order: { fechaLogin: 'DESC' }, // Obtener el registro de login más reciente
    });

    if (usuarioDispositivo) {
      usuarioDispositivo.latitud = String(ubicacion.latitud);
      usuarioDispositivo.longitud = String(ubicacion.longitud);
      return this.userDeviceRepo.save(usuarioDispositivo);
    }

    // Si no hay un registro previo (poco probable en un login), crea uno nuevo
    const nuevoRegistro = this.userDeviceRepo.create({
      usuarioId: userId,
      latitud: String(ubicacion.latitud),
      longitud: String(ubicacion.longitud),
    });
    return this.userDeviceRepo.save(nuevoRegistro);
  }

  // Servicio para guardar la información del dispositivo al iniciar sesión
  async guardarInformacionDispositivo(
    userId: number,
    so: string,
    modelo: string,
    imei: string,
  ): Promise<UserDevice> {
    let dispositivo = await this.deviceRepo.findOne({
      where: { IMEI: imei },
    });
    // Si no existe, crea un nuevo dispositivo
    if (!dispositivo) {
      dispositivo = this.deviceRepo.create({
        sistema_operativo: so,
        modelo: modelo,
        IMEI: imei,
      });
      dispositivo = await this.deviceRepo.save(dispositivo);
    }

    // Luego, crea o actualiza la relación en la tabla usuarios_dispositivos
    const usuarioDispositivo = await this.userDeviceRepo.findOne({
      where: { usuarioId: userId, dispositivoMovilId: dispositivo.id },
      order: { fechaLogin: 'DESC' }, // Obtener el registro más reciente para este usuario y dispositivo
    });

    if (usuarioDispositivo) {
      // Actualiza la información si ya existe una entrada para este usuario y dispositivo
      usuarioDispositivo.fechaLogin = new Date();
      return this.userDeviceRepo.save(usuarioDispositivo);
    }

    // Si no existe, crea un nuevo registro de usuario-dispositivo
    const nuevoRegistro = this.userDeviceRepo.create({
      usuarioId: userId,
      dispositivoMovilId: dispositivo.id,
    });
    return this.userDeviceRepo.save(nuevoRegistro);
  }
}
