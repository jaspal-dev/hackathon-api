import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_SKIP_VARIFICATION } from './SkipVerification';
import { Reflector } from '@nestjs/core';
import { ErrorConstants } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT.secret'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    const skipVerification = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_VARIFICATION,
      [context.getHandler(), context.getClass()],
    );
    if (
      !skipVerification &&
      (!request['user']['isEmailVerified'] ||
        !request['user']['isPhoneNumberVerified'])
    ) {
      throw new UnauthorizedException(
        ErrorConstants.EMAIL_OR_PHONE_NOT_VERIFIED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
