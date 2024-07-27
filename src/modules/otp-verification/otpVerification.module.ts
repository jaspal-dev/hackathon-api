import { Module } from '@nestjs/common';
import { OTPVerificationService } from './otpVerification.service';
import { UserModule } from '../user/user.module';
import { OTPVerificationController } from './otpVerification.controller';
import { OTPVerificationRepository } from './otpVerification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPVerification } from './otpVerification.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([OTPVerification])],
  controllers: [OTPVerificationController],
  providers: [OTPVerificationService, OTPVerificationRepository],
  exports: [],
})
export class OtpVerificationModule {}
