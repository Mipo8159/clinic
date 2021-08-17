import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import User from '../entities/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('Unauthenticated');

    const { email }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) throw new Error('Unauthenticated');

    res.locals.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
