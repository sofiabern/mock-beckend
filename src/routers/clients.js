import { Router } from 'express';

export const clientsRouter = Router();

import {
  getAllClientsController,
  getClientByIdController,
  createClientController,
} from '../controllers/clients.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

clientsRouter.get('/clients', ctrlWrapper(getAllClientsController));

clientsRouter.get('/clients/:clientId', ctrlWrapper(getClientByIdController));

clientsRouter.post('/clients', ctrlWrapper(createClientController));
