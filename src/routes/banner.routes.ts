import { Router } from 'express';
import {
  addBanner,
  getBanners,
  removeBanner,
  uploadBanner,
} from '../controllers/banner.controller';
import upload from '../middlewares/multer';
import auth from '../middlewares/auth';

const router = Router();
router.post('/banner', auth, addBanner);
router.post('/banner/:uuid', auth, upload.single('file'), uploadBanner);
router.delete('/banner/:uuid', auth, removeBanner);
router.get('/banner', getBanners);
export default router;
