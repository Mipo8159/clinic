import { Request, Response } from 'express';
import Orglink from '../entities/OrgLink';

//ADD LINK
export const addOrganizationLink = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const { linkName, linkLocation } = req.body;

  try {
    if (user.role === 'admin') {
      const orglink = new Orglink({
        organizationLinkName: linkName,
        organizationLink: linkLocation,
      });

      await orglink.save();
      return res.json(orglink);
    }

    return res
      .status(403)
      .json({ error: 'Your are not permitted to access' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET LINKS
export const getLinks = async (_: Request, res: Response) => {
  try {
    const links = await Orglink.find();
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE LINK
export const removeLink = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { uuid } = req.params;

  try {
    if (user.role === 'admin') {
      const link = await Orglink.findOneOrFail({ uuid });
      await link.remove();

      return res.json({ error: 'deleted' });
    }

    return res.status(201).json({ error: 'link removed' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
