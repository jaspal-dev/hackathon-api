import { IsEnum } from 'class-validator';
import { NotificationChannelEnum } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({ nullable: true })
  public readonly flightId?: number;

  @Column({ type: 'text' })
  public readonly message: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public readonly timestamp?: Date;

  @IsEnum(NotificationChannelEnum)
  @Column()
  public readonly method: NotificationChannelEnum;

  @Column()
  public readonly recipient: string;
}
