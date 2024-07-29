import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Passenger } from '../passenger/passenger.entity';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({ length: 25 })
  public readonly airline: string;

  @Column({ length: 4, name: 'departure_gate' })
  public readonly departureGate: string;

  @Column({ length: 4, name: 'arrival_gate' })
  public readonly arrivalGate: string;

  @Column({ name: 'scheduled_departure' })
  public readonly scheduledDeparture: Date;

  @Column({ name: 'scheduled_arrival' })
  public readonly scheduledArrival: Date;

  @Column({ nullable: true, name: 'actual_departure' })
  public readonly actualDeparture: Date;

  @Column({ nullable: true, name: 'actual_arrival' })
  public readonly actualArrival: Date;

  @OneToMany(() => Passenger, (passenger) => passenger.flight)
  public readonly passenger: Passenger[];
}
