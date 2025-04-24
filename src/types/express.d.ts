import { JwtPayload } from 'src/auth/jwt_payload.interface'; // Ajusta la ruta

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
