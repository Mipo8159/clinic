import { NextFunction, Request, Response } from 'express';
import Clinic from '../entities/Clinic';

export default async (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  try {
    const exists: Clinic | undefined = await Clinic.findOne({ user });
    if (exists) return next();

    const clinic = new Clinic({ user });
    await clinic.save();
    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
