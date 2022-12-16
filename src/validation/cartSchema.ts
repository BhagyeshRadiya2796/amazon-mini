import Joi from "joi";

export const addToCart = Joi.object().keys({
    productId: Joi.number().required(),
    quantity: Joi.number().required()
});

export const updateCart = Joi.object().keys({
    price: Joi.number().required(),
    quantity: Joi.number().required()
});
