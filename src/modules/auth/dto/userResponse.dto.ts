import { Expose } from 'class-transformer';

class UserResponseDto {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly firstName: string;

  @Expose()
  public readonly lastName: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly countryCode: string;

  @Expose()
  public readonly phoneNumber: string;

  @Expose()
  public readonly preferredLanguage: string;

  @Expose()
  public readonly isEmailVerified: string;

  @Expose()
  public readonly isPhoneNumberVerified: string;
}

export default UserResponseDto;
