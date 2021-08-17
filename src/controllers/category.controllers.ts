import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import Category from '../entities/Category';
import Clinic from '../entities/Clinic';

// GET ALL CATEGORIES
export const getCategories = async (_: Request, res: Response) => {
  const queryBuilder = getRepository(Category)
    .createQueryBuilder('category')
    .leftJoinAndSelect('category.clinics', 'clinic')
    .leftJoinAndSelect('clinic.votes', 'vote')
    .leftJoinAndSelect('clinic.user', 'user')
    .orderBy('category.title', 'ASC')
    .addOrderBy('clinic.createdAt', 'DESC');

  const categories: Category[] = await queryBuilder.getMany();
  categories.forEach((cat) => {
    cat.clinics = cat.clinics.filter((clinic) => {
      return clinic.user.status !== 'rejected';
    });
  });

  return res.json(categories);
};

// GET SINGE CATEGORY
export const getSigleCat = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const category = await getRepository(Category)
      .createQueryBuilder('category')
      .select()
      .where('category.uuid = :uuid', { uuid })
      .leftJoinAndSelect('category.clinics', 'clinic')
      .leftJoinAndSelect('clinic.votes', 'vote')
      .leftJoinAndSelect('clinic.user', 'user')
      .getOne();

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};

// CREATE CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    let errors: any = {};
    if (title === '') errors.title = 'შეიყვანეთ კატეგორია';

    const categoryExists = await Category.findOne({ title });
    if (categoryExists) errors.category = 'კატეგორია უკვე არსებობს';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const category = new Category({ title });
    await category.save();

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE CATEGORIES
export const deleteCategories = async (req: Request, res: Response) => {
  const cats = req.body;
  const data = Object.values(cats).map((v) => v);

  if (cats === '') {
    return res
      .status(400)
      .json({ delete: 'აირჩიეთ კატეგორია წასაშლელად' });
  }

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Category, 'categories')
      .where('categories.uuid IN (:...ids)', { ids: data })
      .execute();
  } catch (error) {
    return res.status(500).json({ Error: 'Something went wrong' });
  }

  return res.json({ message: 'deleted' });
};

// ADD TO CATEGORY
export const addToCategory = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  const user = res.locals.user;

  try {
    const category: Category = await Category.findOneOrFail({
      where: { uuid },
      relations: ['clinics'],
    });
    const clinic = await Clinic.findOneOrFail({ user });

    const sameCheck = category.clinics.every((cli) => {
      return cli.id !== clinic.id;
    });

    if (sameCheck) {
      category.clinics.push(clinic);
      await category.save();
      await clinic.save();
    }

    return res.json({ category });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// REMOVE FROM CATEGORY
export const removeToCategory = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  const user = res.locals.user;

  try {
    const category: Category = await Category.findOneOrFail({
      where: { uuid },
      relations: ['clinics'],
    });
    const clinic = await Clinic.findOneOrFail({ user });

    category.clinics = category.clinics.filter(
      (clinicInCategory) => clinicInCategory.id !== clinic.id
    );

    await category.save();
    await clinic.save();

    return res.json({ category, clinic });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
