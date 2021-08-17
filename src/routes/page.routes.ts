import { Router } from 'express';
import {
  addPage,
  editPage,
  getPage,
  getPages,
  removePage,
} from '../controllers/page.controller';

const router = Router();
router.get('/page', getPages);
router.get('/page/:id', getPage);
router.put('/page/:id', editPage);
router.post('/page', addPage);
router.delete('/page/:id', removePage);
export default router;
