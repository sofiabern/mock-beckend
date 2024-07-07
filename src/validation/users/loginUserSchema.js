import Joi from "joi";
export const loginUserSchema = Joi.object({
password: Joi.string().required(),
email: Joi.string().required().email(),

});
