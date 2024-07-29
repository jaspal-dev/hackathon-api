import { Expose } from 'class-transformer';

class FlightDto {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly airline: string;

  @Expose()
  public readonly departureGate: string;

  @Expose()
  public readonly arrivalGate: string;

  @Expose()
  public readonly scheduledDeparture: Date;

  @Expose()
  public readonly scheduledArrival: Date;

  @Expose()
  public readonly actualDeparture?: Date;

  @Expose()
  public readonly actualArrival?: Date;
}

export default FlightDto;
