import { IsDate, IsNumber } from 'class-validator';

class UpdateFlightDto {
  @IsNumber()
  public readonly id: number;

  @IsDate()
  public readonly scheduled_departure: Date;

  @IsDate()
  public readonly scheduled_arrival: Date;
}

export default UpdateFlightDto;
