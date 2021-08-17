import Partner from '../entities/Partners';
import fs from 'fs';
import { Request, Response } from 'express-serve-static-core';

//GET ALL PARTNERS
export const getPartners = async (_: Request, res: Response) => {
  try {
    const partners = await Partner.find({ order: { createdAt: 'DESC' } });

    return res.status(200).json(partners);
  } catch (err) {
    return res.status(404).json({ error: 'partners not found' });
  }
};

//CREATE PARTNER
export const createPartner = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const { firstname, lastname, description, uuid } = req.body;
  try {
    if (user.role === 'admin') {
      const partner = new Partner({
        firstname,
        lastname,
        description,
        uuid,
      });
      await partner.save();

      return res.json(partner);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATE/ADD IMAGE
export const addImage = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const partner: Partner = await Partner.findOneOrFail({
    uuid,
  });

  if (!req.file) {
    return;
  }
  try {
    const type: any = req.body.type;
    if (type !== 'partner') {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid type' });
    }

    let oldImageUrn: string = '';

    oldImageUrn = partner.imageUrn || '';
    partner.imageUrn = req.file.filename;

    await partner.save();

    if (oldImageUrn !== '') {
      fs.unlinkSync(`public\\images\\${oldImageUrn}`);
    }

    return res.json(partner);
  } catch (err) {
    return res.status(200).json(partner);
  }
};

//ADD LINK
export const addLink = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const { addLink } = req.body;
  const { uuid } = req.params;
  try {
    if (user.role === 'admin') {
      const partner = await Partner.findOneOrFail({ uuid });

      partner.partnerLink = addLink || partner.partnerLink;
      await partner.save();

      return res.json(partner);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE PARTNER
export const deletePartner = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const { uuid } = req.params;
  try {
    if (user.role === 'admin') {
      const partner = await Partner.findOneOrFail({ uuid });
      await partner.remove();

      return res.json({ message: 'deleted' });
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE PARTNER
export const updatePartner = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { firstname, lastname, description } = req.body;

  const { uuid } = req.params;
  try {
    if (user.role === 'admin') {
      const partner = await Partner.findOneOrFail({ uuid });
      partner.firstname = firstname || partner.firstname;
      partner.lastname = lastname || partner.lastname;
      partner.description = description || partner.description;

      await partner.save();

      return res.json(partner);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
