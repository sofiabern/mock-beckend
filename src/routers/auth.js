import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { registerUserSchema } from "../validation/users/registerUserSchema.js";
import { loginUserSchema } from "../validation/users/loginUserSchema.js";

import { registerUserController } from "../controllers/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

export const authRouter = Router();

 authRouter.post('/signup', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
 authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
 authRouter.post('/refresh-token');
 authRouter.post('/logout', ctrlWrapper(logoutUserController));
