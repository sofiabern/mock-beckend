import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import {
  getAllClientsController,
  getClientByIdController,
  createClientController,
  getClientVisitsController
} from '../controllers/clients.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createClientSchema } from '../validation/clients/createClientSchema.js';

export const clientsRouter = Router();


clientsRouter.use(authenticate);

clientsRouter.post('/visits', ctrlWrapper(getClientVisitsController));

clientsRouter.use('/:clientId', validateMongoId('clientId'));

clientsRouter.get('/', ctrlWrapper(getAllClientsController));

clientsRouter.get('/:clientId', ctrlWrapper(getClientByIdController));

clientsRouter.post('/', validateBody(createClientSchema), ctrlWrapper(createClientController));
