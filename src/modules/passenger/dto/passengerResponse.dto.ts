import { Expose } from 'class-transformer';

class PassengerResponse {
  @Expose()
  public readonly success: true;

  @Expose()
  public readonly message: string;
}

export default PassengerResponse;
