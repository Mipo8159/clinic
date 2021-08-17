import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import Category from './Category';

import { Expose } from 'class-transformer';
import Employee from './Employee';
import Model from './Model';
import User from './User';
import { Length } from 'class-validator';
import Vote from './Vote';

@Entity('clinics')
export default class Clinic extends Model {
  constructor(clinic: Partial<Clinic>) {
    super();
    Object.assign(this, clinic);
  }

  @Column({ type: 'text', nullable: true, default: '' })
  description: string;

  @Column({ nullable: true, default: '' })
  logoUrn: string;

  @Column({ nullable: true, default: '' })
  imageUrn: string;

  @Length(1, 100)
  @Column({ nullable: true })
  transparency: number;

  @Length(1, 100)
  @Column({ nullable: true })
  availability: number;

  @Length(1, 100)
  @Column({ nullable: true })
  safety: number;

  @Column({ default: 0 })
  star: number;

  @OneToOne(() => User, (user) => user.clinic)
  @JoinColumn()
  user: User;

  @OneToMany(() => Employee, (employee) => employee.clinic)
  employees: Employee[];

  @ManyToMany(() => Category, (category) => category.clinics)
  categories: Category[];

  @OneToMany(() => Vote, (votes) => votes.clinic)
  @JoinColumn()
  votes: Vote[];

  @Expose()
  get logoUrl(): string {
    return this.logoUrn
      ? `${process.env.APP_URL}/images/${this.logoUrn}`
      : `${process.env.APP_URL}/images/img_placeholder.jpg`;
  }

  @Expose() get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : `${process.env.APP_URL}/images/img_placeholder.jpg`;
  }

  @Expose() get likesCount(): number {
    return this.votes
      ? this.votes.filter((v) => {
          return v.value === 1;
        }).length
      : 3;
  }

  @Expose() get dislikesCount(): number {
    return this.votes
      ? this.votes.filter((v) => {
          return v.value === -1;
        }).length
      : 1;
  }
}
