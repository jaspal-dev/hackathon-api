import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { SignUpDto } from './../auth/dto';
import { ErrorConstants } from 'src/constants';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async createUser(signUpDto: SignUpDto): Promise<User> {
    const emailExists = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (emailExists) {
      throw new BadRequestException(ErrorConstants.EMAIL_ALREADY_EXISTS);
    }
    const phoneNumberExists = await this.userRepository.findOne({
      where: { phoneNumber: signUpDto.phoneNumber },
    });
    if (phoneNumberExists) {
      throw new BadRequestException(ErrorConstants.PHONE_NUMBER_ALREADY_EXISTS);
    }
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

  public async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  public async verifyEmail(id: string): Promise<void> {
    await this.userRepository.update(
      { id },
      { id, isEmailVerified: true, emailVerifiedAt: new Date() },
    );
  }

  public async verifyPhoneNumber(id: string): Promise<void> {
    await this.userRepository.update(
      { id },
      { id, isPhoneNumberVerified: true, phoneNumberVerifiedAt: new Date() },
    );
  }
}
