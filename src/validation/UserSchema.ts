import Joi from "joi";

export const createUser = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string()
});

export const updateUser = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    phone: Joi.string()
}).min(1);

export const loginUser = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});