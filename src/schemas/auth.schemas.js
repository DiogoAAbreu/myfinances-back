import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

export {
    signUpSchema,

}