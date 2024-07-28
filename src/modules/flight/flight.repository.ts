import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlightRepository extends Repository<Flight> {
  public constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {
    super(
      flightRepository.target,
      flightRepository.manager,
      flightRepository.queryRunner,
    );
  }
}
