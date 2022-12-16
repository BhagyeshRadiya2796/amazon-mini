import Joi from "joi";

export const createProduct = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

export const updateProduct = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
}).min(1);
