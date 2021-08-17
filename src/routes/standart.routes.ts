import { Router } from 'express';
import {
  addStandart,
  getStandart,
  updateStandart,
} from '../controllers/standart.controllers';

const router = Router();
router.post('/standart', addStandart);
router.get('/standart', getStandart);
router.patch('/standart/:id', updateStandart);
export default router;
