import { Router } from 'express';
import {
  getClinics,
  rate,
  activate,
  cardRate,
} from '../controllers/admin.controllers';
import auth from '../middlewares/auth';

const router = Router();
router.get('/admin', auth, getClinics);
router.post('/admin/rate', auth, rate);
router.post('/admin/activate', auth, activate);
router.post('/admin/updatecard/:id', auth, cardRate);

export default router;
