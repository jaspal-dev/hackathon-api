import { Type } from 'class-transformer';
import { IsString, MaxLength, IsDate } from 'class-validator';

class AddFlightDto {
  @IsString()
  @MaxLength(25)
  public readonly airline: string;

  @IsString()
  @MaxLength(4)
  public readonly departureGate: string;

  @IsString()
  @MaxLength(4)
  public readonly arrivalGate: string;

  @Type(() => Date)
  @IsDate()
  public readonly scheduledDeparture: Date;

  @Type(() => Date)
  @IsDate()
  public readonly scheduledArrival: Date;
}

export default AddFlightDto;
