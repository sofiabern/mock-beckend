import { Router } from 'express';

import {
  getAllCheckInsController,
  getCheckInByIdController,
  createCheckInClientController,
  deleteCheckInController,
  updateCheckInController
} from '../controllers/check-ins.js';



import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';


export const checkInsRouter = Router();

checkInsRouter.use('/:checkInId', validateMongoId('checkInId'));

checkInsRouter.get('/', ctrlWrapper(getAllCheckInsController));

checkInsRouter.get(
  '/:checkInId',
  ctrlWrapper(getCheckInByIdController),
);

checkInsRouter.post('/', ctrlWrapper(createCheckInClientController));

checkInsRouter.patch('/:checkInId', ctrlWrapper(updateCheckInController));

checkInsRouter.delete( '/:checkInId', ctrlWrapper(deleteCheckInController));

