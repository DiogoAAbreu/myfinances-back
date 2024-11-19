import db from '../db/connection/js'

async function getUserById(req, res) {
    const { userId } = res.locals;

    try {
        const user = await db.collection('users').findOne({ _id: userId });

        delete user.password;

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}