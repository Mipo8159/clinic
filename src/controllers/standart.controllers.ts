import { Request, Response } from 'express';
import Standart from '../entities/Standarts';

// ADD STANDART
export const addStandart = async (req: Request, res: Response) => {
  const { standart } = req.body;
  try {
    if (standart === '') {
      return res.status(400).json({ error: 'გთხოვთ დაწეროთ ტექსტი' });
    }
    const data = new Standart({ standart });
    await data.save();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET STANDART
export const getStandart = async (_: Request, res: Response) => {
  try {
    const data = await Standart.find();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE STANDART
export const updateStandart = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { standart } = req.body;

  try {
    let oldStandart: Standart = await Standart.findOneOrFail(id);
    oldStandart.standart = standart;
    await oldStandart.save();

    return res.status(200).json(oldStandart);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
