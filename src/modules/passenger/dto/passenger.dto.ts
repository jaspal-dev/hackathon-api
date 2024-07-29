import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { ValidationConstants } from 'src/constants';
import { TrimString } from 'src/transformers';
import { IsValidPhoneNumber } from 'src/validators';

class PassengerDto {
  @IsString()
  @TrimString()
  public readonly name: string;

  @TrimString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @TrimString()
  @MaxLength(ValidationConstants.countryCodeMaxLength)
  public readonly countryCode: string;

  @IsNumberString()
  @IsValidPhoneNumber()
  @MaxLength(ValidationConstants.phoneNoMaxLength)
  public readonly phoneNumber: string;

  @IsNumber()
  public readonly flightId: number;
}

export default PassengerDto;
