import { Column, Entity } from 'typeorm';
import Model from './Model';

@Entity('standarts')
export default class Standart extends Model {
  constructor(standart: Partial<Standart>) {
    super();
    Object.assign(this, standart);
  }

  @Column({ unique: true })
  standart: string;
}
