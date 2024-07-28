import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { OTPVerificationService } from './otpVerification.service';
import OTPRequestDto from './dto/otpRequest.dto';
import { OtpResponse, OtpVerificationRequest } from './dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { SkipVerification } from '../auth/SkipVerification';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('v1/otp-verification')
export class OTPVerificationController {
  public constructor(
    private readonly otpVerificationService: OTPVerificationService,
  ) {}

  @Post('/send-otp')
  @SkipVerification()
  public async sendSMSOTP(
    @Body() otpRequestDto: OTPRequestDto,
    @Req() request: Request,
  ): Promise<OtpResponse> {
    return this.otpVerificationService.sendOTP(
      request['user']['sub'],
      otpRequestDto.otpChannel,
    );
  }

  @Post('/verify-otp')
  @SkipVerification()
  public async verifySMSOTP(
    @Body() otpVerificationRequest: OtpVerificationRequest,
    @Req() request: Request,
  ): Promise<OtpResponse> {
    return this.otpVerificationService.verifyOTP(
      request['user']['sub'],
      otpVerificationRequest.otpChannel,
      otpVerificationRequest.otp,
    );
  }
}
