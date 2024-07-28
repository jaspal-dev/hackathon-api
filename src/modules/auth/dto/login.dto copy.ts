import {
  IsEmail,
  IsString,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
import { ValidationConstants } from './../../../constants';
import { TrimString } from 'src/transformers';

class LoginDto {
  @IsString()
  @TrimString()
  @IsEmail()
  @MaxLength(ValidationConstants.emailMaxLength)
  public readonly email: string;

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

export default LoginDto;
