import { BeforeInsert, Column, Entity } from 'typeorm';
import { makeid } from '../utils/helper';
import Model from './Model';

@Entity('orglinks')
export default class Orglink extends Model {
  constructor(orglink: Partial<Orglink>) {
    super();
    Object.assign(this, orglink);
  }

  @Column()
  organizationLink: string;

  @Column()
  organizationLinkName: string;

  @Column()
  uuid: string;

  @BeforeInsert()
  insertId() {
    this.uuid = makeid(15);
  }
}
