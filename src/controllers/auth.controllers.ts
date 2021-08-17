import { isEmpty, validate } from 'class-validator';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

/* - - - - - REGISTER - - - - - */
export const register = async (req: Request, res: Response) => {
  const { clinicName, email, password, identifier, address, mobile } =
    req.body;

  try {
    let errors: any = {};
    const emailExists = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    if (emailExists) errors.email = 'Email already exists';

    const mobileExists = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
    if (mobileExists) errors.mobile = 'Mobile number is already taken.';

    const identifierExists = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.identifier = :identifier', { identifier })
      .getOne();
    if (identifierExists)
      errors.identifier = 'Identifier is already taken.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User({
      clinicName,
      email,
      password,
      identifier,
      address,
      mobile,
    });
    errors = await validate(user);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

/* - - - - - LOGIN - - - - - */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const errors: any = {};
    if (isEmpty(email)) errors.email = 'email must not be empty';
    if (isEmpty(password)) errors.password = 'password must not be empty';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user)
      return res
        .status(404)
        .json({ email: 'user with this email does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ password: 'Incorrect password' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!);

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        path:'/',
        sameSite: 'strict',
        // domain: 'localhost',
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
      })
    );

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};

/* - - - - - ACCESS - - - - - */
export const access = (_: Request, res: Response) => {
  const user = res.locals.user;
  return res.json(user);
};

/* - - - - - LOGOUT - - - - - */
export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      path:'/',
      sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    })
  );

  res.clearCookie('token');

  return res.json({ success: true });
};

/* - - - - - UPDATE - - - - - */
export const rename = async (req: Request, res: Response) => {
  const { newName } = req.body;
  const user: User = res.locals.user;

  try {
    user.clinicName = newName || user.clinicName;

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
