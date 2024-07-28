import { IsString, MaxLength, IsDate } from 'class-validator';

class AddFlightDto {
  @IsString()
  @MaxLength(25)
  public readonly airline: string;

  @IsString()
  @MaxLength(4)
  public readonly departure_gate: string;

  @IsString()
  @MaxLength(4)
  public readonly arrival_gate: string;

  @IsDate()
  public readonly scheduled_departure: Date;

  @IsDate()
  public readonly scheduled_arrival: Date;
}

export default AddFlightDto;
