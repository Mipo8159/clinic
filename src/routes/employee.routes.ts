import { Router } from 'express';
import {
  create,
  uploadEmp,
  editEmployee,
  deleteEmployee,
} from '../controllers/employee.controllers';
import auth from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = Router();
router.post('/employee/create', auth, create);
router.post('/employee/upload/:uuid', upload.single('file'), uploadEmp);
router.put('/employee/edit/:uuid', editEmployee);
router.delete('/employee/delete/:uuid', deleteEmployee);
export default router;
