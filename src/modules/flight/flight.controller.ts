import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AddFlightDto, FlightDto, FlightResponse, GetFlightDto } from './dto';
import { FlightService } from './flight.service';
import UpdateFlightDto from './dto/updateFlight.dto';
import { AuthGuard } from '../auth/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('v1/flight')
export class FlightController {
  public constructor(private readonly flightService: FlightService) {}

  @Get()
  public async getFlights(
    @Query() getFlightDto: GetFlightDto,
  ): Promise<FlightDto[] | FlightDto> {
    return this.flightService.getFlight(getFlightDto);
  }

  @Post()
  public async addFlight(
    @Body() addFlightDto: AddFlightDto,
  ): Promise<FlightResponse> {
    return this.flightService.addFlight(addFlightDto);
  }

  @Patch()
  public async updateFlight(
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<FlightResponse> {
    return this.flightService.updateFlight(updateFlightDto);
  }
}
