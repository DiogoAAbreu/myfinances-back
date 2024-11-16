import Joi from 'joi';

const newUserSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

export {
    newUserSchema,

}