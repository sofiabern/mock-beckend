import { Router } from 'express';

export const clientsRouter = Router();

import {
  getAllClientsController,
  getClientByIdController,
  createClientController,
} from '../controllers/clients.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createClientSchema } from '../validation/clients/createClientSchema.js';
clientsRouter.use('/clients/:clientId', validateMongoId('clientId'));

clientsRouter.get('/clients', ctrlWrapper(getAllClientsController));

clientsRouter.get('/clients/:clientId', ctrlWrapper(getClientByIdController));

clientsRouter.post('/clients', validateBody(createClientSchema), ctrlWrapper(createClientController));
