import db from '../db/connection.js';

async function createNewTransaction(req, res) {
    const { userId, transactionData } = res.locals;

    try {
        transactionData.value = transactionData.value * 100;

        const newTransaction = {
            ...transactionData,
            userId,
            date: Date.now()
        }

        await db.collection('transactions').insertOne(newTransaction);

        return res.status(201).send(newTransaction);
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

async function getTransactions(req, res) {
    const { userId } = res.locals;

    {
        try {
            console.log(userId)
            const transactions = await db.collection('transactions').find({ userId }).toArray();

            return res.status(200).send(transactions);
        } catch (error) {
            return res.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export {
    createNewTransaction,
    getTransactions,

}