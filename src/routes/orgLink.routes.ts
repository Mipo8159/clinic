import { Router } from 'express';
import {
  addOrganizationLink,
  getLinks,
  removeLink,
} from '../controllers/orgLink.controllers';
import auth from '../middlewares/auth';

const router = Router();
router.post('/partner/addorglink', auth, addOrganizationLink);
router.get('/partner/getLinks', getLinks);
router.delete('/partner/deleteLink/:uuid', auth, removeLink);
export default router;
