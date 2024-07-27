import { IsEnum, IsUUID } from 'class-validator';
import OTPChannelEnum from 'src/enums/OTPChannel';

class OTPRequestDto {
  @IsUUID(4)
  public readonly userId: string;

  @IsEnum(OTPChannelEnum)
  public readonly otpChannel: OTPChannelEnum;
}

export default OTPRequestDto;
