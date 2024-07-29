import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PassengerDto, PassengerResponseDto } from './dto';
import { PassengerService } from './passenger.service';
import { AuthGuard } from '../auth/auth.gaurd';

@Controller('v1/passenger')
@UseGuards(AuthGuard)
export class PassengerController {
  public constructor(private readonly passengerService: PassengerService) {}
  @Post()
  public async addPassenger(
    @Body() passengerDto: PassengerDto,
  ): Promise<PassengerResponseDto> {
    return this.passengerService.addPassenger(passengerDto);
  }
}
