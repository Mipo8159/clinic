import { Router } from 'express';
import {
  deleteEmail,
  getEmails,
  sendEmail,
} from '../controllers/email.controllers';
import { getMail } from '../controllers/mail.controllers';

const router = Router();
router.post('/email', sendEmail);
router.delete('/email/:id', deleteEmail);
router.get('/email', getEmails);
router.post('/email/single', getMail);
export default router;
