import { Router } from 'express';

import {
  getAllCheckInsController,
  getCheckInByIdController,
  createCheckInController
} from '../controllers/check-ins.js';

export const checkInsRouter = Router();

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

checkInsRouter.get('/check-ins', ctrlWrapper(getAllCheckInsController));

checkInsRouter.get(
  '/check-ins/:checkInId',
  ctrlWrapper(getCheckInByIdController),
);

checkInsRouter.post('/check-ins', ctrlWrapper(createCheckInController));
