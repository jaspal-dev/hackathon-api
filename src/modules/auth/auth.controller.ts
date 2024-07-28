import { Body, Controller, Post, Res, Header } from '@nestjs/common';
import { SignUpDto, UserResponseDto } from './dto';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import LoginDto from './dto/login.dto copy';

@Controller('v1/auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  @Header('Access-Control-Expose-Headers', 'Authorization')
  public async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseDto> {
    const user = await this.authService.createUser(signUpDto);
    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
      isEmailVerified: user.isEmailVerified,
      isPhoneNumberVerified: user.isPhoneNumberVerified,
    });
    response.set('Authorization', accessToken);
    return plainToInstance(UserResponseDto, user);
  }

  @Post('/login')
  @Header('Access-Control-Expose-Headers', 'Authorization')
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseDto> {
    const user = await this.authService.signIn(
      loginDto.email,
      loginDto.password,
    );
    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
      isEmailVerified: user.isEmailVerified,
      isPhoneNumberVerified: user.isPhoneNumberVerified,
    });
    response.set('Authorization', accessToken);
    return plainToInstance(UserResponseDto, user);
  }
}
