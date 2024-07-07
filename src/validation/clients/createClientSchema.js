import Joi from "joi";
export const createClientSchema = Joi.object({
last_name: Joi.string().required(),
first_name: Joi.string().required(),
middle_name: Joi.string(),
passport_details: Joi.string().required(),
comment: Joi.string().required(),
});
