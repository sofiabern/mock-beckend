import { Router } from 'express';

import {
  getAllCheckInsController,
  getCheckInByIdController,
  createCheckInClientController,
  deleteCheckInController
} from '../controllers/check-ins.js';

export const checkInsRouter = Router();

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

checkInsRouter.use('/check-ins/:checkInId', validateMongoId('checkInId'));

checkInsRouter.get('/check-ins', ctrlWrapper(getAllCheckInsController));

checkInsRouter.get(
  '/check-ins/:checkInId',
  ctrlWrapper(getCheckInByIdController),
);

checkInsRouter.post('/check-ins', ctrlWrapper(createCheckInClientController));

checkInsRouter.delete( '/check-ins/:checkInId', ctrlWrapper(deleteCheckInController));
