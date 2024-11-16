import { newUserSchema } from '../schemas/auth.schemas.js'
import db from '../db/connection.js'

async function verifyNewUser(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: 'As senhas são divergentes.' });
    }

    const newUser = {
        name,
        email,
        password
    }

    const validNewUser = newUserSchema.validate(newUser, { abortEarly: false });

    if (validNewUser.error) {
        return res.status(422).send({ message: 'Verifique seus dados.' });
    }

    const emailExists = await db.collection('users').findOne({ email: email });

    if (emailExists) {
        return res.status(400).send({ message: 'E-mail já cadastrado.' })
    }

    res.locals.newUser = newUser;

    next();
}

export {
    verifyNewUser,

}