import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Clinic from './Clinic';
import Model from './Model';

@Entity('employees')
export default class Employee extends Model {
  constructor(employee: Partial<Employee>) {
    super();
    Object.assign(this, employee);
  }

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  profession: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ unique: true })
  uuid: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.employees)
  @JoinColumn()
  clinic: Clinic;

  @Expose() get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : `${process.env.APP_URL}/images/img_placeholder.jpg`;
  }
}
