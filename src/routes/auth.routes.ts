import { Router } from 'express';
import auth from '../middlewares/auth';

import {
  register,
  login,
  access,
  logout,
  rename,
} from '../controllers/auth.controllers';

const router = Router();
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/access', auth, access);
router.get('/auth/logout', auth, logout);
router.put('/auth/rename', auth, rename);
export default router;
