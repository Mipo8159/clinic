import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { makeid } from '../utils/helper';

import Model from './Model';

@Entity('banners')
export default class Banner extends Model {
  constructor(banner: Partial<Banner>) {
    super();
    Object.assign(this, banner);
  }

  @PrimaryColumn()
  uuid: string;

  @Column()
  bannerLink: string;

  @Column({ nullable: true })
  bannerImg: string;

  @BeforeInsert()
  async createId() {
    this.uuid = await makeid(15);
  }
}
