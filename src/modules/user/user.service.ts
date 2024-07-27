import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { SignUpDto } from './../auth/dto';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async createUser(signUpDto: SignUpDto): Promise<User> {
    const user = this.userRepository.create({
      ...signUpDto,
    });
    await this.userRepository.insert(user);
    return user;
  }

  public async findUser(email: string, password: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email, password },
    });
  }
}
