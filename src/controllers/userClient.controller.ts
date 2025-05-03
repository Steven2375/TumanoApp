import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserClientService } from '../services/userClient.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  UserClient,
  UserClientPayload,
} from '../userClient/userClient.decorator';

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
  async getAgenda(@UserClient() user: UserClientPayload) {
    const usuario_id = user.id;
    const fecha = new Date();

    return this.userClientService.obtenerAgenda(usuario_id, fecha);
  }
}
