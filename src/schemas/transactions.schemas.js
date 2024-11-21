import Joi from 'joi';

const createTransactionSchema = Joi.object({
    value: Joi.number().positive().precision(2).required(),
    type: Joi.string().valid('deposit', 'withdraw').required(),
    description: Joi.string().min(3).required()
})

export {
    createTransactionSchema,

}