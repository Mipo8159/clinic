import { Router } from 'express';
import { findSelf, vote } from '../controllers/vote.controllers';

const router = Router();
router.post('/vote', vote);
router.get('/vote', findSelf);
export default router;
