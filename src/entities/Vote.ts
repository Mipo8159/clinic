import { Column, Entity, ManyToOne } from 'typeorm';
import Clinic from './Clinic';

import Model from './Model';

@Entity('votes')
export default class Vote extends Model {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @Column()
  ip_address: string;

  @ManyToOne(() => Clinic)
  clinic: Clinic;
}
