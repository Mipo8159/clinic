import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import trim from './middlewares/trim';
dotenv.config();
const PORT = process.env.PORT;

import authRoutes from './routes/auth.routes';
import clinicRoutes from './routes/clinic.routes';
import employeeRoutes from './routes/employee.routes';
import adminRoutes from './routes/admin.routes';
import partnerRoutes from './routes/partner.routes';
import orgLinkRoutes from './routes/orgLink.routes';
import categoryRoutes from './routes/category.routes';
import bannerRoutes from './routes/banner.routes';
import voteRoutes from './routes/vote.routes';
import emailRoutes from './routes/email.routes';
import standatRoutes from './routes/standart.routes';
import pageRoutes from './routes/page.routes';
import mailRoutes from './routes/mail.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(trim);
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.static('public'));

app.get('/api/test', (_, res) => {
  res.json({ message: 'Server working' });
});

app.use('/api', authRoutes);
app.use('/api', clinicRoutes);
app.use('/api', employeeRoutes);
app.use('/api', adminRoutes);
app.use('/api', partnerRoutes);
app.use('/api', orgLinkRoutes);
app.use('/api', categoryRoutes);
app.use('/api', bannerRoutes);
app.use('/api', voteRoutes);
app.use('/api', emailRoutes);
app.use('/api', standatRoutes);
app.use('/api', pageRoutes);
app.use('/api', mailRoutes);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    createConnection();
    console.log('Database connected');
  } catch (error) {
    console.log(error.message);
  }
});
