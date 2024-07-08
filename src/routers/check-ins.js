import { Router } from 'express';

import {
  getAllCheckInsController,
  getCheckInByIdController,
  createCheckInClientController,
  deleteCheckInController
} from '../controllers/check-ins.js';



import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';


export const checkInsRouter = Router();

checkInsRouter.use('/:checkInId', validateMongoId('checkInId'));

checkInsRouter.get('/', ctrlWrapper(getAllCheckInsController));

checkInsRouter.get(
  '/:checkInId', validateMongoId('checkInId'),
  ctrlWrapper(getCheckInByIdController),
);

checkInsRouter.post('/', ctrlWrapper(createCheckInClientController));

checkInsRouter.delete( '/:checkInId', validateMongoId('checkInId'), ctrlWrapper(deleteCheckInController));
