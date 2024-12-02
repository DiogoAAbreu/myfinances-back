import db from '../db/connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'

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

async function createSession(req, res) {
    const { userId } = res.locals;

    try {
        const token = uuid();

        const newSession = {
            token,
            userId,
            active: true
        }

        await db.collection('sessions').insertOne(newSession);

        return res.status(201).send(token);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

async function disableSession(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        await db.collection('sessions').updateOne(
            { token },
            { $set: { active: false } });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createUser,
    createSession,
    disableSession,

}