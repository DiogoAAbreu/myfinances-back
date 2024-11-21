import db from '../db/connection.js';

async function createNewTransaction(req, res) {
    const { userId } = res.locals;
    const { value, description, type } = req.body;

    try {
        const newTransaction = {
            userId,
            value,
            type,
            description,
            date: Date.now()
        }

        await db.collection('transactions').insertOne({ newTransaction });

        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createNewDeposit,

}