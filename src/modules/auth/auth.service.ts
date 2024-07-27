import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { SignUpDto } from './dto';
import { User } from './../user/user.entity';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async createUser(signUpDto: SignUpDto): Promise<User> {
    return this.userService.createUser(signUpDto);
  }

  public async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
