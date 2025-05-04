import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface UserClientPayload extends JwtPayload {
  id: number;
  imei: string;
}

export const UserClient = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserClientPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as UserClientPayload | undefined;
  },
);
