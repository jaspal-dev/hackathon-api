import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightRepository } from './flight.repository';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Flight } from './flight.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight]),
    JwtModule,
    ConfigModule,
    NotificationModule,
    PassengerModule,
    NotificationModule,
  ],
  controllers: [FlightController],
  providers: [FlightRepository, FlightService],
  exports: [],
})
export class FlightModule {}
