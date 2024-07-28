import { IsEnum, IsNumberString, Length } from 'class-validator';
import OTPChannelEnum from 'src/enums/OTPChannel';

class OTPVerificationRequestDto {
  @IsEnum(OTPChannelEnum)
  public readonly otpChannel: OTPChannelEnum;

  @IsNumberString()
  @Length(6)
  public readonly otp: string;
}

export default OTPVerificationRequestDto;
