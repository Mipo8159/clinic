import { Column, Entity } from 'typeorm';

import Model from './Model';

@Entity('pages')
export default class Page extends Model {
  constructor(page: Partial<Page>) {
    super();
    Object.assign(this, page);
  }

  @Column()
  title: string;

  @Column({ default: '' })
  body: string;
}
