import { Router } from 'express';

// Controllers
import {
  getAllRoomsController,
  updateRoomController,
} from '../controllers/rooms.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';


// Schemas
import { updateRoomSchema } from '../validation/rooms/updateRoomSchema.js';



export const roomsRouter = Router();

roomsRouter.use(authenticate);

roomsRouter.get('/', ctrlWrapper(getAllRoomsController) );

roomsRouter.patch('/:roomId', validateMongoId('roomId'), validateBody(updateRoomSchema), ctrlWrapper(updateRoomController));
