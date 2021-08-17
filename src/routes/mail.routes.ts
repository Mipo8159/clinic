import { Router } from 'express';
import {
  deleteMail,
  getMails,
  saveMail,
} from '../controllers/mail.controllers';

const router = Router();
router.post('/mails', saveMail);
router.get('/mails', getMails);
router.delete('/mails/:id', deleteMail);
export default router;
