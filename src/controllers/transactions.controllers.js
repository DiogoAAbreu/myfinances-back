import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

async function createNewTransaction(req, res) {
    const { userId, transactionData } = res.locals;

    try {
        transactionData.value = transactionData.value * 100;

        const newTransaction = {
            ...transactionData,
            userId,
            date: Date.now(),
            active: true
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
            const transactions = await db.collection('transactions')
                .find({
                    $and: [
                        { active: true },
                        { userId }
                    ]
                })
                .toArray();

            return res.status(200).send(transactions);
        } catch (error) {
            return res.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

async function getTransactionsBalance(req, res) {
    const { userId } = res.locals;

    try {
        const withdrawTransactions = await db.collection('transactions')
            .find({
                $and: [
                    { type: 'withdraw' },
                    { userId }]
            }).toArray()

        const depositTransactions = await db.collection('transactions').find({
            $and: [
                { type: 'deposit' },
                { userId }]
        }).toArray()

        const totalAmountWithdrawn = withdrawTransactions.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.value;
        }, 0);

        const totalAmountDeposited = depositTransactions.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.value;
        }, 0);

        return res.status(200).send({ totalAmountDeposited, totalAmountWithdrawn });
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

async function deleteTransaction(req, res) {
    const { id } = req.params;

    try {
        await db.collection('transactions').updateOne({ _id: new ObjectId(id) }, { $set: { active: false } });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createNewTransaction,
    getTransactions,
    getTransactionsBalance,
    deleteTransaction,

}