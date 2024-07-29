import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

class GetFlightDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  public readonly id?: number;
}

export default GetFlightDto;
