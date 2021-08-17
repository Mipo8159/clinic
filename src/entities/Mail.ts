import { IsEmail, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

import Model from './Model';

@Entity('mails')
export default class Mail extends Model {
  constructor(mail: Partial<Mail>) {
    super();
    Object.assign(this, mail);
  }

  @Length(2, 255, { message: 'გთხოვთ მიუთითოთ თქვენი სახელი' })
  @Column()
  name: string;

  @IsEmail(undefined, { message: 'მეილი არ არსებობს' })
  @Length(1, 255, { message: 'გთხოვთ მიუთითოთ თქვენი მეილი' })
  @Column()
  email: string;

  @Length(1, 255, { message: 'გთხოვთ მიუთითოთ თემა' })
  @Column()
  subject: string;

  @Length(5, 255, { message: 'ველი არ უნდა იყოს ცარიელი' })
  @Column()
  body: string;
}
