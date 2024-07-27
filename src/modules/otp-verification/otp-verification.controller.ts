import { Controller, Post } from '@nestjs/common';
import { OTPVerificationService } from './otp-verification.service';

@Controller('v1/otp-verification')
export class OTPVerificationController {
  public constructor(
    private readonly otpVerificationService: OTPVerificationService,
  ) {}

  @Post('/send-sms-otp')
  public async sendSMSOTP(userId: string): Promise<void> {
    await this.otpVerificationService.sendSMSOTP(userId);
  }

  @Post('/verify-sms-otp')
  public async verifySMSOTP(userId: string): Promise<void> {}

  @Post('/send-email-otp')
  public async sendEmailOTP(userId: string): Promise<void> {}

  @Post('/verify-email-otp')
  public async verifyEmailOTP(userId: string): Promise<void> {}
}
