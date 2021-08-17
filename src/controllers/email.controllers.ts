import { Request, Response } from 'express';
import Email from '../entities/Email';

export const sendEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const exists = await Email.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ error: 'აღნიშნული ელ-ფოსტა უკვე გაგზავნილია' });
    }

    if (email === '') {
      return res.status(400).json({ empty: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' });
    }

    const mail = new Email({ email });
    await mail.save();

    return res.status(200).json(mail);
  } catch (err) {}
  return res.status(500).json({ error: 'Something went wrong' });
};

export const deleteEmail = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const mail = await Email.findOne(id);
    await mail?.remove();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getEmails = async (_: Request, res: Response) => {
  try {
    const emails = await Email.find();

    return res.status(200).json(emails);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
