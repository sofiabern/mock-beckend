import { Router } from 'express';

// Conrollers
import {
  getAllCheckInsController,
  createCheckInController,
  deleteCheckInController,
  updateCheckInController
} from '../controllers/check-ins.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';

// Schemas
import { createCheckInSchema } from '../validation/check-ins/createCheckInSchema.js';
import { updateCheckInSchema } from '../validation/check-ins/updateCheckInSchema.js';



export const checkInsRouter = Router();

checkInsRouter.get('/', ctrlWrapper(getAllCheckInsController));

checkInsRouter.post('/', ctrlWrapper(createCheckInController));

checkInsRouter.patch('/:checkInId',  validateMongoId('checkInId'), validateBody(updateCheckInSchema), ctrlWrapper(updateCheckInController));

checkInsRouter.delete( '/:checkInId', validateMongoId('checkInId'), ctrlWrapper(deleteCheckInController));

