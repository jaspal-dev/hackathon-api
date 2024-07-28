import { IsEnum } from 'class-validator';
import OTPChannelEnum from 'src/enums/OTPChannel';

class OTPRequestDto {
  @IsEnum(OTPChannelEnum)
  public readonly otpChannel: OTPChannelEnum;
}

export default OTPRequestDto;
