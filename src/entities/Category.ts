import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { makeid } from '../utils/helper';

import Clinic from './Clinic';

import Model from './Model';

@Entity('categories')
export default class Category extends Model {
  constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }

  @PrimaryColumn()
  uuid: string;

  @Column()
  title: string;

  @ManyToMany(() => Clinic, (clinic) => clinic.categories)
  @JoinTable()
  clinics: Clinic[];

  @BeforeInsert()
  createId() {
    this.uuid = makeid(15);
  }
}
