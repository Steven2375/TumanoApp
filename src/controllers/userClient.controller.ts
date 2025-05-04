import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserClientService } from '../services/userClient.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  UserClient,
  UserClientPayload,
} from '../userClient/userClient.decorator';
import { UbicacionDto } from 'src/auth/Dto/login.dto';

@Controller('sync')
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
  @Post('data')
  async getAgenda(
    @UserClient() user: UserClientPayload,
    @Body() ubicacionDto: UbicacionDto,
  ) {
    const usuario_id = user.id;
    const fecha = new Date();
    const IMEI = user.imei;
    console.log(ubicacionDto);
    console.log(IMEI);

    return this.userClientService.obtenerAgenda(
      usuario_id,
      fecha,
      IMEI,
      ubicacionDto,
    );
  }
}
