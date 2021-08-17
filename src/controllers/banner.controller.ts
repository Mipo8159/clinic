import { Request, Response } from 'express';
import fs from 'fs';
import Banner from '../entities/Banner';

// CREATE BANNER
export const addBanner = async (req: Request, res: Response) => {
  const { bannerLink } = req.body;
  try {
    const banner = new Banner({ bannerLink });
    await banner.save();

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};

// REMOVE BANNER
export const removeBanner = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const banner = await Banner.findOneOrFail({ uuid });
    await banner.remove();

    return res.status(200).json({ message: 'removed' });
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};

// GET BANNERS
export const getBanners = async (_: Request, res: Response) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPLOAD BANNER
export const uploadBanner = async (req: any, res: Response) => {
  const { uuid } = req.params;
  const banner: Banner = await Banner.findOneOrFail({
    uuid,
  });

  try {
    const type = req.body.type;
    if (type !== 'bannerimg') {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid type' });
    }

    let oldBanner: string = '';

    oldBanner = banner.bannerImg || '';
    banner.bannerImg = req.file.filename;

    await banner.save();

    if (oldBanner !== '') {
      fs.unlinkSync(`public\\images\\${oldBanner}`);
    }

    return res.json(banner);
  } catch (err) {
    return res.status(200).json({ error: 'Something went wrong' });
  }
};
