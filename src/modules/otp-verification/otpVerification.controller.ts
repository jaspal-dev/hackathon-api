import { Controller, Post } from '@nestjs/common';
import { OTPVerificationService } from './otpVerification.service';
import OTPChannelEnum from 'src/enums/OTPChannel';
import OTPRequestDto from './dto/otpRequest.dto';
import { OtpSentResponse } from './dto';

@Controller('v1/otp-verification')
export class OTPVerificationController {
  public constructor(
    private readonly otpVerificationService: OTPVerificationService,
  ) {}

  @Post('/send-otp')
  public async sendSMSOTP(
    otpRequestDto: OTPRequestDto,
  ): Promise<OtpSentResponse> {
    return this.otpVerificationService.sendOTP(
      otpRequestDto.userId,
      otpRequestDto.otpChannel,
    );
  }

  @Post('/verify-otp')
  public async verifySMSOTP(userId: string): Promise<void> {}
}
