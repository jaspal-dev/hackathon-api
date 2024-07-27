import { ValidationConstants } from 'src/constants';
import { PreferredLanguageEnum } from 'src/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OTPVerification } from '../otp-verification/otpVerification.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ name: 'first_name', length: ValidationConstants.nameMaxLength })
  public readonly firstName: string;

  @Column({ name: 'last_name', length: ValidationConstants.nameMaxLength })
  public readonly lastName: string;

  @Column({ length: ValidationConstants.emailMaxLength })
  public readonly email: string;

  @Column({
    name: 'is_email_verified',
    default: false,
  })
  public readonly isEmailVerified: boolean;

  @Column({
    name: 'email_verified_at',
    nullable: true,
  })
  public readonly emailVerifiedAt?: Date;

  @Column({
    name: 'country_code',
    length: ValidationConstants.countryCodeMaxLength,
  })
  public readonly countryCode: string;

  @Column({
    name: 'phone_number',
    length: ValidationConstants.phoneNoMaxLength,
  })
  public readonly phoneNumber: string;

  @Column({
    name: 'is_phone_number_verified',
    default: false,
  })
  public readonly isPhoneNumberVerified: boolean;

  @Column({
    name: 'phone_number_verified_at',
    nullable: true,
  })
  public readonly phoneNumberVerifiedAt?: Date;

  @Column({
    name: 'preferred_language',
    type: 'enum',
    enum: PreferredLanguageEnum,
    default: PreferredLanguageEnum.ENGLISH,
  })
  public readonly preferredLanguage: PreferredLanguageEnum;

  @Column({ length: ValidationConstants.passwordMaxLength, select: false })
  public readonly password: string;

  @Column({
    type: 'uuid',
    name: 'session_id',
    nullable: true,
  })
  public readonly sessionId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt: Date;

  @OneToMany(() => OTPVerification, (OTPVerification) => OTPVerification.user)
  public readonly otpVerification: OTPVerification[];
}
