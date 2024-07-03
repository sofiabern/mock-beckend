import { Router } from 'express';

export const clientsRoouter = Router();

import {
  getAllClientsController,
  getClientByIdController,
} from '../controllers/clients.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';


clientsRoouter.get('/clients', ctrlWrapper(getAllClientsController) );

clientsRoouter.get('/clients/:clientId', ctrlWrapper(getClientByIdController) );
