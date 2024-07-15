import { Router } from 'express';

// Controllers
import {
  getAllClientsController,
  getClientVisitsController
} from '../controllers/clients.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {validateBody} from "../middlewares/validateBody.js";
// import { authenticate } from '../middlewares/authenticate.js';

// Schemas
import { getVisitsSchema } from '../validation/clients/getVisitsScchema.js';



export const clientsRouter = Router();

// clientsRouter.use(authenticate);

clientsRouter.get('/', ctrlWrapper(getAllClientsController));

clientsRouter.post('/visits', validateBody(getVisitsSchema), ctrlWrapper(getClientVisitsController));
