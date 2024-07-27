import { ValidationConstants } from 'src/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'otp_verifications' })
export class OTPVerification {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ name: 'is_email_verification', default: false })
  public readonly isEmailVerification: boolean;

  @Column({ nullable: true, length: ValidationConstants.emailMaxLength })
  public readonly email?: string;

  @Column({ name: 'is_phone_number_verification', default: false })
  public readonly isPhoneNumberVerification: boolean;

  @Column({
    name: 'phone_number',
    nullable: true,
    length: ValidationConstants.phoneNoMaxLength,
  })
  public readonly phoneNumber?: string;

  @Column({ name: 'is_active', default: true })
  public readonly isActive: boolean;

  @Column({ type: 'char', length: 6 })
  public readonly otp: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public readonly updatedAt: Date;

  @ManyToOne(() => User, (user) => user.otpVerification)
  public readonly user: User;
}
