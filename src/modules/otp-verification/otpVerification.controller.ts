import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OTPVerificationService } from './otpVerification.service';
import OTPRequestDto from './dto/otpRequest.dto';
import { OtpResponse, OtpVerificationRequest } from './dto';
import { AuthGuard } from '../auth/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('v1/otp-verification')
export class OTPVerificationController {
  public constructor(
    private readonly otpVerificationService: OTPVerificationService,
  ) {}

  @Post('/send-otp')
  public async sendSMSOTP(
    @Body() otpRequestDto: OTPRequestDto,
  ): Promise<OtpResponse> {
    return this.otpVerificationService.sendOTP(
      otpRequestDto.userId,
      otpRequestDto.otpChannel,
    );
  }

  @Post('/verify-otp')
  public async verifySMSOTP(
    @Body() otpVerificationRequest: OtpVerificationRequest,
  ): Promise<OtpResponse> {
    return this.otpVerificationService.verifyOTP(
      otpVerificationRequest.userId,
      otpVerificationRequest.otpChannel,
      otpVerificationRequest.otp,
    );
  }
}
