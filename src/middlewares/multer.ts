import multer from 'multer';
import { makeid } from '../utils/helper';
import path from 'path';
import { Request } from 'express';

/* MULTER */
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (_: Request, file: Express.Multer.File, callback) => {
      const name = makeid(15);
      callback(null, name + path.extname(file.originalname)); // e.g aiufniawfn + .png
    },
  }),
  fileFilter: (_: Request, file: Express.Multer.File, callback) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/svg+xml'
    ) {
      callback(null, true); //accept file = true
    } else {
      callback(new Error('Not an image')); //accept file = false
    }
  },
});

export default upload;
