import { Module } from '@nestjs/common';
import { OTPVerificationService } from './otpVerification.service';
import { UserModule } from '../user/user.module';
import { OTPVerificationController } from './otpVerification.controller';
import { OTPVerificationRepository } from './otpVerification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPVerification } from './otpVerification.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from '../notification/notification.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    UserModule,
    TypeOrmModule.forFeature([OTPVerification]),
    NotificationModule,
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [OTPVerificationController],
  providers: [OTPVerificationService, OTPVerificationRepository],
  exports: [],
})
export class OtpVerificationModule {}
