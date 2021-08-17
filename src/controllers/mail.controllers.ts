import { validate } from 'class-validator';
import { Request, Response } from 'express';
import Mail from '../entities/Mail';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

// SAVE MAILS
export const saveMail = async (req: Request, res: Response) => {
  const { name, email, subject, body } = req.body;

  let errors: any = {};
  const mailExists = await Mail.find({ email });
  if (mailExists.length >= 2)
    errors.mailErr = 'მეილების ლიმიტი ამოწურულია';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const newMail = new Mail({ name, email, subject, body });

    errors = await validate(newMail);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await newMail.save();

    return res.status(200).json(newMail);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET MAILS
export const getMails = async (_: Request, res: Response) => {
  try {
    const mails = await Mail.find();

    return res.status(200).json(mails);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE MAIL
export const deleteMail = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const mailToDel = await Mail.findOneOrFail(id);
    await mailToDel.remove();

    return res.status(200).json({ messag: 'deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET SINGLE MAIL
export const getMail = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const mail = await Mail.findOneOrFail(id);

    return res.status(200).json(mail);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
