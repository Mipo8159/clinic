import { Column, Entity } from 'typeorm';

import Model from './Model';

@Entity('emails')
export default class Email extends Model {
  constructor(email: Partial<Email>) {
    super();
    Object.assign(this, email);
  }

  @Column({ unique: true })
  email: string;
}
