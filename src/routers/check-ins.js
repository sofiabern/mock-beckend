import { Router } from 'express';

import {
  getAllCheckInsController,
  getCheckInByIdController,
  createCheckInController,
  deleteCheckInController
} from '../controllers/check-ins.js';

export const checkInsRouter = Router();

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

checkInsRouter.get('/check-ins', ctrlWrapper(getAllCheckInsController));

checkInsRouter.get(
  '/check-ins/:checkInId',
  ctrlWrapper(getCheckInByIdController),
);

checkInsRouter.post('/check-ins', ctrlWrapper(createCheckInController));

checkInsRouter.delete( '/check-ins/:checkInId', ctrlWrapper(deleteCheckInController));
