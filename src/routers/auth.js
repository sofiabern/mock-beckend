import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { signupUserSchema } from "../validation/users/signupUserSchema.js";
import { loginUserSchema } from "../validation/users/loginUserSchema.js";

import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from '../middlewares/authenticate.js';
import {  getCurrentContoller, loginUserController, signupUserController } from "../controllers/auth.js";

import {logoutUserController} from "../controllers/auth.js";


export const authRouter = Router();


authRouter.post('/signup', validateBody(signupUserSchema), ctrlWrapper(signupUserController));
authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));
authRouter.get('/current', authenticate, ctrlWrapper(getCurrentContoller));
