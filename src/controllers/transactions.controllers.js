import db from '../db/connection.js';

async function createNewTransaction(req, res) {
    const { userId, transactionData } = res.locals;

    try {
        const newTransaction = {
            ...transactionData,
            userId,
            date: Date.now()
        }

        await db.collection('transactions').insertOne({ newTransaction });

        return res.status(201).send(newTransaction);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createNewTransaction,

}