import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import Model from './Model';

@Entity('partners')
export default class Partner extends Model {
  constructor(partner: Partial<Partner>) {
    super();
    Object.assign(this, partner);
  }

  @Column({ nullable: true })
  organizationLink: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  partnerLink: string;

  @Expose() get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : `${process.env.APP_URL}/images/img_placeholder.jpg`;
  }
}
