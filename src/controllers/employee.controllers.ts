import { Request, Response } from 'express';
import Employee from '../entities/Employee';
import Clinic from '../entities/Clinic';
import fs from 'fs';

// CREATE EMPLOYEE
export const create = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const clinic: Clinic | undefined = await Clinic.findOne({ user });
  const { firstname, lastname, profession, uuid } = req.body;
  try {
    const employee = new Employee({
      firstname,
      lastname,
      profession,
      uuid,
      clinic,
    });
    await employee.save();

    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPLOAD EMPLOYEE
export const uploadEmp = async (req: any, res: Response) => {
  const { uuid } = req.params;
  const employee: Employee = await Employee.findOneOrFail({
    uuid,
  });

  try {
    const type = req.body.type;
    if (type !== 'emp') {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid type' });
    }

    let oldImageUrn: string = '';

    oldImageUrn = employee.imageUrn || '';
    employee.imageUrn = req.file.filename;

    await employee.save();

    if (oldImageUrn !== '') {
      fs.unlinkSync(`public\\images\\${oldImageUrn}`);
    }

    return res.json(employee);
  } catch (err) {
    return res.status(200).json(employee);
  }
};

// UPDATE EMPLOYEE
export const editEmployee = async (req: Request, res: Response) => {
  const { name, surname, prof } = req.body;
  const { uuid } = req.params;

  try {
    const employee = await Employee.findOneOrFail({ uuid });

    employee.firstname = name || employee.firstname;
    employee.lastname = surname || employee.lastname;
    employee.profession = prof || employee.profession;

    await employee.save();
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Somethingwent wrong' });
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const employee = await Employee.findOneOrFail({ uuid });

    await employee.remove();
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Somethingwent wrong' });
  }
};
