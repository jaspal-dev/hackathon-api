import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsStrongPassword,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { ValidationConstants } from './../../../constants';
import { PreferredLanguageEnum } from 'src/enums';
import { IsValidPhoneNumber } from 'src/validators';
import { TrimString } from 'src/transformers';

class SignUpDto {
  @IsString()
  @TrimString()
  @MaxLength(ValidationConstants.nameMaxLength)
  @MinLength(ValidationConstants.nameMinLength)
  public readonly firstName: string;

  @IsString()
  @TrimString()
  @MaxLength(ValidationConstants.nameMaxLength)
  @MinLength(ValidationConstants.nameMinLength)
  public readonly lastName: string;

  @IsString()
  @TrimString()
  @IsEmail()
  @MaxLength(ValidationConstants.emailMaxLength)
  public readonly email: string;

  @IsString()
  @TrimString()
  @MaxLength(ValidationConstants.countryCodeMaxLength)
  public readonly countryCode: string;

  @IsNumberString()
  @IsValidPhoneNumber()
  @MaxLength(ValidationConstants.phoneNoMaxLength)
  public readonly phoneNumber: string;

  @IsEnum(PreferredLanguageEnum)
  @IsOptional()
  public readonly preferredLanguage?: PreferredLanguageEnum;

  @IsString()
  @MaxLength(ValidationConstants.passwordMaxLength)
  @IsStrongPassword({
    minLength: ValidationConstants.passwordMinLength,
    minLowercase: ValidationConstants.passwordMinLowercase,
    minSymbols: ValidationConstants.passwordMinSymbols,
    minUppercase: ValidationConstants.passwordMinUppercase,
    minNumbers: ValidationConstants.passwordMinNumbers,
  })
  public readonly password: string;
}

export default SignUpDto;
