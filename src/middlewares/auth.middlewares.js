import { signUpSchema } from '../schemas/auth.schemas.js';
import db from '../db/connection.js';
import bcrypt from 'bcrypt';

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

    const validNewUser = signUpSchema.validate(newUser, { abortEarly: false });

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

async function verifyUser(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email: email });

        if (!user) {
            return res.status(400).send({ message: 'Usuário ou senha inválidos' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send({ message: 'Usuário ou senha inválidos' });
        }

        res.locals.userId = user._id;

        next();
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' })
    }
}

export {
    verifyNewUser,
    verifyUser,

}