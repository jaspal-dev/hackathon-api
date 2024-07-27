import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignUpDto, UserResponseDto } from './dto';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('v1/auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  public async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseDto> {
    const user = await this.authService.createUser(signUpDto);
    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });
    response.set('Authorization', accessToken);
    return plainToInstance(UserResponseDto, user);
  }
}
