import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flight } from '../flight/flight.entity';

@Entity({ name: 'passengers' })
export class Passenger {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly name: string;

  @Column()
  public readonly email: string;

  @Column({ name: 'phone_number' })
  public readonly phoneNumber: string;

  @ManyToOne(() => Flight, (flight) => flight.passenger, { nullable: false })
  @JoinColumn({ name: 'flight_id' })
  public readonly flight: Flight;

  @Column({ name: 'flight_id' })
  public readonly flightId: number;
}
