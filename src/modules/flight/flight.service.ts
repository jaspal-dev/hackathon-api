import { Injectable } from '@nestjs/common';
import { FlightRepository } from './flight.repository';
import { AddFlightDto, FlightResponse } from './dto';
import { plainToInstance } from 'class-transformer';
import { SuccessConstants } from 'src/constants';
import UpdateFlightDto from './dto/updateFlight.dto';

@Injectable()
export class FlightService {
  public constructor(public readonly flightRepository: FlightRepository) {}

  public async addFlight(addFlightDto: AddFlightDto): Promise<FlightResponse> {
    const flight = this.flightRepository.create(addFlightDto);
    await this.flightRepository.insert(flight);
    return plainToInstance(FlightResponse, {
      success: true,
      message: SuccessConstants.FLIGHT_ADDED,
    });
  }

  public async updateFlight(
    updateFlightDto: UpdateFlightDto,
  ): Promise<FlightResponse> {
    await this.flightRepository.update(
      { id: updateFlightDto.id },
      updateFlightDto,
    );
    return plainToInstance(FlightResponse, {
      success: true,
      message: SuccessConstants.FLIGHT_UPDATED,
    });
  }
}
