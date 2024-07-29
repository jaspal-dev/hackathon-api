import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PassengerRepository extends Repository<Passenger> {
  public constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {
    super(
      passengerRepository.target,
      passengerRepository.manager,
      passengerRepository.queryRunner,
    );
  }
}
