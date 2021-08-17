import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import Clinic from '../entities/Clinic';
import User from '../entities/User';

export const getClinics = async (req: Request, res: Response) => {
  const user = res.locals.user;

  try {
    if (user.role === 'admin') {
      const queryBuilder = getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.clinic', 'clinic')
        .orderBy('user.createdAt', 'ASC');

      if (req.query.search) {
        queryBuilder.where('LOWER(user.clinicName) LIKE :clinicName', {
          clinicName: `%${req.query.search}%`,
        });
      }

      if (req.query.status) {
        queryBuilder.andWhere('user.status = :status', {
          status: req.query.status,
        });
      }

      const allUsers = await queryBuilder.getMany();

      const users = allUsers.filter((usr) => {
        return usr.role !== 'admin';
      });
      return res.json(users);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// RATE
export const rate = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { rate, identifier } = req.body;

  try {
    if (user.role === 'admin') {
      const user = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.identifier = :identifier', { identifier })
        .leftJoinAndSelect('user.clinic', 'clinic')
        .getOneOrFail();

      user.clinic.star = rate;

      await user.clinic.save();

      return res.status(200).json(user);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE CARD INFO
export const cardRate = async (req: Request, res: Response) => {
  const { transparency, availability, safety } = req.body;
  const { id } = req.params;

  try {
    const clinic = await Clinic.findOneOrFail(id);
    clinic.safety = safety || clinic.safety;
    clinic.availability = availability || clinic.availability;
    clinic.transparency = transparency || clinic.transparency;

    await clinic.save();

    return res.status(200).json(clinic);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// ACTIVATE
export const activate = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { status, identifier } = req.body;

  try {
    if (user.role === 'admin') {
      const user = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.identifier = :identifier', { identifier })
        .getOneOrFail();

      user.status = status;
      await user.save();

      return res.status(200).json(user);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
