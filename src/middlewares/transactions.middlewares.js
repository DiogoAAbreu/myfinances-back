import { ObjectId } from "mongodb";
import db from "../db/connection.js";
import { createTransactionSchema } from "../schemas/transactions.schemas.js";

async function verifyTransaction(req, res, next) {
    const { description, type, value } = req.body;

    const transactionData = {
        description,
        type,
        value
    }

    const validTransaction = createTransactionSchema.validate(transactionData, { abortEarly: false });

    if (validTransaction.error) {
        return res.status(422).send({ message: 'Verifique as informações e tente novamente!' });
    }

    res.locals.transactionData = transactionData;

    next()
}

async function verifyTransactionOwer(req, res, next) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        const transaction = await db.collection('transactions')
            .findOne({
                $and: [
                    { userId },
                    { _id: new ObjectId(id) }
                ]
            })

        if (!transaction) {
            return res.status(400).send({ message: 'Tente novamente mais tarde.' });
        }

        next();
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
}

export {
    verifyTransaction,
    verifyTransactionOwer

}