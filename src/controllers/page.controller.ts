import { Response, Request } from 'express';
import Page from '../entities/Page';

// CREATE PAGE
export const addPage = async (req: Request, res: Response) => {
  const { title, body } = req.body;

  if (body.trim() === '') {
    return res.status(400).json({ body: 'გთხოვთ დაწეროთ რამე' });
  }

  if (title.trim() === '') {
    return res.status(400).json({ title: 'გთხოვთ დაწეროთ რამე' });
  }

  try {
    const page = new Page({ body, title });
    await page.save();

    return res.status(200).json(page);
  } catch (err) {
    return res.status(500).json({ erro: 'Something went wrong' });
  }
};

// REMOVE PAGE
export const removePage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const page = await Page.findOneOrFail(id);
    await page.remove();

    return res.status(200).json({ msg: 'page removed' });
  } catch (err) {
    return res.status(500).json({ erro: 'Something went wrong' });
  }
};

// UPDATE PAGE
export const editPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const page = await Page.findOneOrFail(id);
    page.body = body || page.body;
    page.title = title || page.title;

    await page.save();
    return res.status(200).json(page);
  } catch (err) {
    return res.status(500).json({ erro: 'Something went wrong' });
  }
};

// GET SINGLE
export const getPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const page = await Page.findOne(id);

    return res.status(200).json(page);
  } catch (err) {
    return res.status(500).json({ erro: 'Something went wrong' });
  }
};

// GET PAGES
export const getPages = async (_: Request, res: Response) => {
  try {
    const pages = await Page.find();

    return res.status(200).json(pages);
  } catch (err) {
    return res.status(500).json({ erro: 'Something went wrong' });
  }
};
