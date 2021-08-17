import { Router } from 'express';
import {
  createPartner,
  addImage,
  addLink,
  getPartners,
  deletePartner,
  updatePartner,
} from '../controllers/partner.controllers';
import auth from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = Router();
router.post('/partner/createPartner', auth, createPartner);
router.post(
  '/partner/addImage/:uuid',
  auth,
  upload.single('file'),
  addImage
);

router.post('/partner/addLink/:uuid', auth, addLink);
router.get('/partner/getMany', getPartners);
router.delete('/partner/delete/:uuid', auth, deletePartner);
router.put('/partner/update/:uuid', auth, updatePartner);
export default router;
