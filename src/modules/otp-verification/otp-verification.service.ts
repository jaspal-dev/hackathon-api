import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OTPVerificationRepository } from './otp-verification.repository';
import { generate } from 'otp-generator';
import { UserService } from '../user/user.service';
import { ErrorConstants } from 'src/constants';

@Injectable()
export class OTPVerificationService {
  public constructor(
    private readonly userService: UserService,
    private readonly otpVerificationRepository: OTPVerificationRepository,
  ) {}

  public async sendSMSOTP(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (user.isPhoneNumberVerified) {
      throw new NotFoundException(ErrorConstants.USER_NOT_FOUND);
    }
    if (user.isPhoneNumberVerified) {
      throw new BadRequestException(ErrorConstants.PHONE_ALREADY_VERIFIED);
    }
    const otp: string = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const optVerification = this.otpVerificationRepository.create({
      phoneNumber: user.phoneNumber,
      user,
      otp,
    });
    await this.otpVerificationRepository.insert(optVerification);
    console.log(optVerification);
  }
}
