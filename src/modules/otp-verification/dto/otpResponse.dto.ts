import { Expose } from 'class-transformer';

class OTPResponse {
  @Expose()
  public readonly success: boolean;

  @Expose()
  public readonly message: string;
}

export default OTPResponse;
