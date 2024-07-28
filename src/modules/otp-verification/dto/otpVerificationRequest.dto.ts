import { IsEnum, IsNumberString, IsUUID, Length } from 'class-validator';
import OTPChannelEnum from 'src/enums/OTPChannel';

class OTPVerificationRequestDto {
  @IsUUID(4)
  public readonly userId: string;

  @IsEnum(OTPChannelEnum)
  public readonly otpChannel: OTPChannelEnum;

  @IsNumberString()
  @Length(6)
  public readonly otp: string;
}

export default OTPVerificationRequestDto;
