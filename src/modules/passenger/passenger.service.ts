import { BadRequestException, Injectable } from '@nestjs/common';
import { PassengerRepository } from './passenger.repository';
import { PassengerDto, PassengerResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { ErrorConstants, SuccessConstants } from 'src/constants';
import { FlightRepository } from '../flight/flight.repository';

@Injectable()
export class PassengerService {
  public constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly flightRepository: FlightRepository,
  ) {}

  public async addPassenger(
    passengerdto: PassengerDto,
  ): Promise<PassengerResponseDto> {
    const flight = await this.flightRepository.findOne({
      where: { id: passengerdto.flightId },
    });
    if (!flight) {
      throw new BadRequestException(ErrorConstants.FLIGHT_NOT_FOUND);
    }
    const passenger = this.passengerRepository.create({
      ...passengerdto,
      flightId: undefined,
      flight,
    });
    await this.passengerRepository.insert(passenger);
    return plainToInstance(PassengerResponseDto, {
      success: true,
      message: SuccessConstants.PASSENGER_ADDED,
    });
  }
}
