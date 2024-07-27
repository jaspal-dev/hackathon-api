import { Module } from '@nestjs/common';
import { OTPVerificationService } from './otp-verification.service';
import { UserModule } from '../user/user.module';
import { OTPVerificationController } from './otp-verification.controller';
import { OTPVerificationRepository } from './otp-verification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPVerification } from './otp-verification.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([OTPVerification])],
  controllers: [OTPVerificationController],
  providers: [OTPVerificationService, OTPVerificationRepository],
  exports: [],
})
export class OtpVerificationModule {}
