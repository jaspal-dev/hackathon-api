import { Repository } from 'typeorm';
import { OTPVerification } from './otpVerification.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OTPVerificationRepository extends Repository<OTPVerification> {
  public constructor(
    @InjectRepository(OTPVerification)
    private otpRepository: Repository<OTPVerification>,
  ) {
    super(
      otpRepository.target,
      otpRepository.manager,
      otpRepository.queryRunner,
    );
  }
}
