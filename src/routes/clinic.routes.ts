import { Router } from 'express';
import {
  uploadImage,
  getMany,
  getOne,
  description,
  editName,
  searchClinics,
  getOneById,
} from '../controllers/clinic.controllers';
import auth from '../middlewares/auth';
import init from '../middlewares/init';
import upload from '../middlewares/multer';

const router = Router();
router.post('/clinic/upload', auth, upload.single('file'), uploadImage);
router.get('/clinic/init', auth, init, getOne);
router.get('/clinics', getMany);
router.patch('/clinic/description', auth, description);
router.patch('/clinic/editname', auth, editName);

router.get('/clinic/:name', searchClinics);
router.get('/clinic/clinic_name/:id', getOneById);

export default router;
