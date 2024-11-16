import { newUserSchema } from '../schemas/auth.schemas.js'

async function verifyNewUser(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: 'passwords are not the same' });
    }

    const newUser = {
        name,
        email,
        password
    }

    const validNewUser = newUserSchema.validate(newUser, { abortEarly: false });

    if (validNewUser.error) {
        const errors = validNewUser.error.details.map(error => error.message);

        return res.status(422).send(errors);
    }

    res.locals.newUser = newUser;

    next();
}

export {
    verifyNewUser,

}