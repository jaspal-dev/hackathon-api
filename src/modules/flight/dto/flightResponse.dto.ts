import { Expose } from 'class-transformer';

class FlightResponse {
  @Expose()
  public readonly success: true;

  @Expose()
  public readonly message: string;
}

export default FlightResponse;
