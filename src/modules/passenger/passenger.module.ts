import { Module } from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerService } from './passenger.service';
import { PassengerRepository } from './passenger.repository';
import { PassengerController } from './passenger.controller';
import { FlightRepository } from '../flight/flight.repository';
import { Flight } from '../flight/flight.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passenger]),
    TypeOrmModule.forFeature([Flight]),
    JwtModule,
    ConfigModule,
  ],
  providers: [PassengerService, PassengerRepository, FlightRepository],
  controllers: [PassengerController],
  exports: [PassengerRepository],
})
export class PassengerModule {}
