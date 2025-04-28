import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dto/user.dto';
import { User } from 'src/Entities/user.entity';
import { LoginDto } from './Dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllAuth() {
    return 'hola';
  }

  // Endpoint para el registro de usuario (sign up)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  // Endpoint para el ingreso de usuario (log in)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.sigIn(loginDto);
  }
}
