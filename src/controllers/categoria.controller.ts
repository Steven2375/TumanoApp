import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriasService } from 'src/services/categoria.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(AuthGuard)
  @Get('dic')
  async obtenerCategorias() {
    return this.categoriasService.obtenerCategorias();
  }
}
