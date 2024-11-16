import db from '../db/connection.js';
import bcrypt from 'bcrypt';

async function createUser(req, res) {
    const { name, email, password } = res.locals.newUser;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword
        }

        await db.collection('users').insertOne(newUser);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createUser,

}