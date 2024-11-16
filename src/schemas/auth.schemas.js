import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export {
    signUpSchema,
    signInSchema
}