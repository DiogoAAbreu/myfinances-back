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
        console.log(validTransaction.error.details)
        return res.status(422).send({ message: 'Verifique as informações e tente novamente!' });
    }

    res.locals.transactionData = transactionData;

    next()
}

export {
    verifyTransaction,

}