import Joi from "joi";
    // last_name: { type: String, required: true },
    // first_name: { type: String, required: true },
    // middle_name: { type: String },
    // passport_details: { type: String, required: true },
    // comment: { type: String },
export const createClientSchema = Joi.object({
last_name: Joi.string().required(),
first_name: Joi.string().required(),
middle_name: Joi.string(),
passport_details: Joi.string().required(),
comment: Joi.string().required(),
});
