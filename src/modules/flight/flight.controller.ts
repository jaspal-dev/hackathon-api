import { Body, Controller, UseGuards } from '@nestjs/common';
import { AddFlightDto, FlightResponse } from './dto';
import { FlightService } from './flight.service';
import UpdateFlightDto from './dto/updateFlight.dto';
import { AuthGuard } from '../auth/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('v1/flight')
export class FlightController {
  public constructor(private readonly flightService: FlightService) {}

  public async addFlight(
    @Body() addFlightDto: AddFlightDto,
  ): Promise<FlightResponse> {
    return this.flightService.addFlight(addFlightDto);
  }

  public async updateFlight(
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<FlightResponse> {
    return this.flightService.updateFlight(updateFlightDto);
  }
}
