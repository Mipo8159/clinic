import { IsEmail, Length } from 'class-validator';
import { Entity, Column, Index, BeforeInsert, OneToOne } from 'typeorm';
import Model from './Model';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import Clinic from './Clinic';

export enum ClinicStatus {
  REJECTED = 'rejected',
  APPROVED = 'approved',
  IN_PROCESS = 'in_process',
}

export enum Role {
  CLINIC = 'clinic',
  ADMIN = 'admin',
}

@Entity('users')
export default class User extends Model {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Length(2, 255, { message: 'Must be at least 2 characters long' })
  @Column()
  clinicName: string;

  @Index()
  @IsEmail(undefined, { message: 'Invalid email' })
  @Length(1, 255, { message: 'Must not be empty' })
  @Column({ unique: true })
  email: string;

  @Length(9, 255, { message: 'Must be at least 9 characters long' })
  @Column()
  mobile: string;

  @Column()
  @Length(4, 255, { message: 'Must be at least 4 characters long' })
  address: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: 'Must be at least 6 characters long' })
  password: string;

  @Column({ unique: true })
  @Length(4, 255, { message: 'Invalid identifier' })
  identifier: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLINIC,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: ClinicStatus,
    default: ClinicStatus.IN_PROCESS,
  })
  status: ClinicStatus;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  @OneToOne(() => Clinic, (clinic) => clinic.user)
  clinic: Clinic;
}
