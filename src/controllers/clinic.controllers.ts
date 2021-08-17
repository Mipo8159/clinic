import { Request, Response } from 'express-serve-static-core';
import Clinic from '../entities/Clinic';
import fs from 'fs';
import { getRepository } from 'typeorm';
import { isEmpty } from 'class-validator';
import User from '../entities/User';

// GET CLINICS
export const getMany = async (req: Request, res: Response) => {
  try {
    const queryBuilder = await getRepository(Clinic)
      .createQueryBuilder('clinics')
      .leftJoinAndSelect('clinics.user', 'user')
      .leftJoinAndSelect('clinics.categories', 'category')
      .leftJoinAndSelect('clinics.votes', 'vote');

    if (req.query.limit) {
      queryBuilder.limit(Number(req.query.limit));
    }

    if (req.query.offset) {
      queryBuilder.offset(Number(req.query.offset));
    }

    const clinicsAll = await queryBuilder.getMany();

    const clinics = clinicsAll.filter(
      (item) => item.user.role !== 'admin'
    );

    return res.status(200).json(clinics);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET CLINIC
export const getOne = async (_: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
    const clinic = await Clinic.findOneOrFail({
      where: { user },
      relations: ['user', 'employees'],
    });
    if (!clinic) return res.status(404).json({ clinic: 'No clinics yet' });

    return res.status(200).json(clinic);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET CLINIC BY ID
export const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const clinic = await Clinic.findOneOrFail({
      where: { id },
      relations: ['user', 'employees', 'votes'],
    });
    if (!clinic) return res.status(404).json({ clinic: 'No clinics yet' });

    return res.status(200).json(clinic);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPLOAD IMAGE OPTIONS
export const uploadImage = async (req: any, res: Response) => {
  try {
    const user = res.locals.user;
    const clinic: Clinic = await Clinic.findOneOrFail({ user });

    try {
      const type = req.body.type;

      if (type !== 'logo' && type !== 'image') {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'Invalid type' });
      }

      let oldImageUrn: string = '';
      if (type === 'logo') {
        oldImageUrn = clinic.logoUrn || '';
        clinic.logoUrn = req.file.filename;
      } else if (type === 'image') {
        oldImageUrn = clinic.imageUrn || '';
        clinic.imageUrn = req.file.filename;
      }

      await clinic.save();

      if (oldImageUrn !== '') {
        fs.unlinkSync(`public\\images\\${oldImageUrn}`);
      }

      return res.json(clinic);
    } catch (error) {}

    return res.status(200).json(clinic);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// EDIT CLINIC DESCRIPTION
export const description = async (req: Request, res: Response) => {
  const { description } = req.body;
  try {
    const user = res.locals.user;
    const clinic: Clinic = await Clinic.findOneOrFail({ user });

    clinic.description = description || clinic.description;
    await clinic.save();

    return res.json(clinic);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// EDIT CLINIC NAME
export const editName = async (req: Request, res: Response) => {
  const { newClinicName } = req.body;

  try {
    const user = res.locals.user;

    user.clinicName = newClinicName || user.clinicName;
    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// SEARCH CLINICS
export const searchClinics = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    if (isEmpty(name)) {
      return res.status(400).json({ error: 'Name must not be empty' });
    }

    const queryBuilder = getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.clinic', 'clinic')
      .orderBy('user.createdAt', 'ASC')
      .where('LOWER(user.clinicName) LIKE :clinicName', {
        clinicName: `%${name}%`,
      });

    const users = await queryBuilder.getMany();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
