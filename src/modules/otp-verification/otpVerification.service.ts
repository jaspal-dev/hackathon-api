import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OTPVerificationRepository } from './otpVerification.repository';
import { generate } from 'otp-generator';
import { UserService } from '../user/user.service';
import { ErrorConstants, SuccessConstants } from 'src/constants';
import OtpResponse from './dto/OtpResponse.dto';
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
  ): Promise<OtpResponse> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorConstants.USER_NOT_FOUND);
    }
    if (channel === OTPChannelEnum.SMS && user.isPhoneNumberVerified) {
      throw new BadRequestException(ErrorConstants.PHONE_ALREADY_VERIFIED);
    }
    if (channel === OTPChannelEnum.EMAIL && user.isEmailVerified) {
      throw new BadRequestException(ErrorConstants.EMAIL_ALREADY_VERIFIED);
    }
    const otp: string = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    await this.otpVerificationRepository.update(
      {
        userId,
        ...(channel === OTPChannelEnum.SMS && {
          phoneNumber: user.phoneNumber,
        }),
        ...(channel === OTPChannelEnum.EMAIL && {
          email: user.email,
        }),
      },
      { isActive: false },
    );
    const optVerification = this.otpVerificationRepository.create({
      phoneNumber:
        channel === OTPChannelEnum.SMS ? user.phoneNumber : undefined,
      email: channel === OTPChannelEnum.EMAIL ? user.email : undefined,
      user,
      otp,
    });
    await this.otpVerificationRepository.insert(optVerification);
    return plainToInstance(OtpResponse, {
      success: true,
      message:
        channel === OTPChannelEnum.SMS
          ? SuccessConstants.SMS_OTP_SENT
          : SuccessConstants.EMAIL_OTP_SENT,
    });
  }

  public async verifyOTP(
    userId: string,
    channel: OTPChannelEnum,
    otp: string,
  ): Promise<OtpResponse> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorConstants.USER_NOT_FOUND);
    }
    if (channel === OTPChannelEnum.SMS && user.isPhoneNumberVerified) {
      throw new BadRequestException(ErrorConstants.PHONE_ALREADY_VERIFIED);
    }
    if (channel === OTPChannelEnum.EMAIL && user.isEmailVerified) {
      throw new BadRequestException(ErrorConstants.EMAIL_ALREADY_VERIFIED);
    }
    const record = await this.otpVerificationRepository.findOne({
      where: {
        userId: user.id,
        isActive: true,
        otp,
        phoneNumber: channel === OTPChannelEnum.SMS ? user.phoneNumber : null,
        email: channel === OTPChannelEnum.EMAIL ? user.email : null,
      },
    });
    if (!record) {
      throw new BadRequestException(ErrorConstants.INVALID_OR_EXPIRED_OTP);
    }
    await this.otpVerificationRepository.update(
      { id: record.id },
      { isActive: false },
    );
    if (channel === OTPChannelEnum.EMAIL) {
      await this.userService.verifyEmail(user.id);
    }
    if (channel === OTPChannelEnum.SMS) {
      await this.userService.verifyPhoneNumber(user.id);
    }
    return plainToInstance(OtpResponse, {
      succcess: true,
      message:
        channel === OTPChannelEnum.SMS
          ? SuccessConstants.SMS_OTP_VERIFIED
          : SuccessConstants.EMAIL_OTP_VERIFIED,
    });
  }
}
