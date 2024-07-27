import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OTPVerificationRepository } from './otpVerification.repository';
import { generate } from 'otp-generator';
import { UserService } from '../user/user.service';
import { ErrorConstants, SuccessConstants } from 'src/constants';
import OTPSentResponse from './dto/OtpSentResponse.dto';
import { plainToInstance } from 'class-transformer';
import OTPChannelEnum from 'src/enums/OTPChannel';

@Injectable()
export class OTPVerificationService {
  public constructor(
    private readonly userService: UserService,
    private readonly otpVerificationRepository: OTPVerificationRepository,
  ) {}

  public async sendOTP(
    userId: string,
    channel: OTPChannelEnum,
  ): Promise<OTPSentResponse> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorConstants.USER_NOT_FOUND);
    }
    if (channel === OTPChannelEnum.SMS && user.isPhoneNumberVerified) {
      throw new BadRequestException(ErrorConstants.PHONE_ALREADY_VERIFIED);
    }
    if (channel === OTPChannelEnum.EMAIL && user.isPhoneNumberVerified) {
      throw new BadRequestException(ErrorConstants.EMAIL_ALREADY_VERIFIED);
    }
    const otp: string = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const optVerification = this.otpVerificationRepository.create({
      phoneNumber: channel === OTPChannelEnum.SMS ? user.phoneNumber : null,
      email: channel === OTPChannelEnum.EMAIL ? user.email : null,
      user,
      otp,
    });
    await this.otpVerificationRepository.insert(optVerification);
    return plainToInstance(OTPSentResponse, {
      success: true,
      message:
        channel === OTPChannelEnum.SMS
          ? SuccessConstants.SMS_OTP_SENT
          : SuccessConstants.EMAIL_OTP_SENT,
    });
  }
}
