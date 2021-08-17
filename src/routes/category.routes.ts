import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategories,
  addToCategory,
  removeToCategory,
  getSigleCat,
} from '../controllers/category.controllers';
import auth from '../middlewares/auth';

const router = Router();
router.get('/categories', getCategories);
router.get('/category/:title/:uuid', getSigleCat);

router.post('/categories', auth, createCategory);
router.post('/categories/delete', auth, deleteCategories);

router.post('/categories/add', auth, addToCategory);
router.post('/categories/remove', auth, removeToCategory);
export default router;
