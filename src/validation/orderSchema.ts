import Joi from "joi";

export const placeOrder = Joi.object().keys({
   cartDetailIds: Joi.array().required()
});

export const updateOrder = Joi.object().keys({
    price: Joi.number().required(),
    quantity: Joi.number().required()
});
