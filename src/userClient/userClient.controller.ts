import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserClientService } from './userClient.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserClient } from './userClient.decorator';
import { JwtPayload } from 'jsonwebtoken';

@Controller('userClient')
export class UserClientController {
  userClientService: UserClientService;
  constructor(userClientService: UserClientService) {
    this.userClientService = userClientService;
  }

  @Get()
  getAll() {
    return 'hola';
  }
  @UseGuards(AuthGuard)
  @Get('agenda')
  async getAgenda(@UserClient() user: JwtPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const usuario_id = user.id;
    const fecha = new Date();
    console.log(usuario_id);
    console.log(fecha);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.userClientService.obtenerAgenda(usuario_id, fecha);
  }
}
