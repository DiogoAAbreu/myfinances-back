import Joi from 'joi';

const createDepositSchema = Joi.object({
    value: Joi.number().positive().precision(2).required(),
    description: Joi.string().min(3).required()
})

export {
    createDepositSchema,

}