import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import { sumTransactionsValues } from '../utils/transactions.utils.js'

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
                    { active: true },
                    { userId }]
            }).toArray()

        const depositTransactions = await db.collection('transactions').find({
            $and: [
                { type: 'deposit' },
                { active: true },
                { userId }]
        }).toArray()

        const totalAmountWithdrawn = sumTransactionsValues(withdrawTransactions);

        const totalAmountDeposited = sumTransactionsValues(depositTransactions);

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
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

async function updateTransaction(req, res) {
    const {id} = req.params;
    const { transactionData } = res.locals;

    try{
        await db.collection('transactions').updateOne({ _id: new ObjectId(id) }, { $set: transactionData });

        return res.sendStatus(200);
    }catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    createNewTransaction,
    getTransactions,
    getTransactionsBalance,
    deleteTransaction,
    updateTransaction,

}