import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateFlightDto {
  @IsNumber()
  public readonly id: number;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  public readonly airline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  public readonly departureGate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  public readonly arrivalGate?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public readonly scheduledDeparture?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public readonly scheduledArrival?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public readonly actualDeparture?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public readonly actualArrival?: Date;
}

export default UpdateFlightDto;
