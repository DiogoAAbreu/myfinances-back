import { createTransactionSchema } from "../schemas/transactions.schemas.js";

async function verifyTransaction(req, res, next) {
    const { description, type, value } = req.body;

    const transactionData = {
        description,
        type,
        value
    }

    const validDeposit = createTransactionSchema.valid(depositData);

    if (validDeposit.error) {
        return res.status(422).send({ message: 'Verifique as informações e tente novamente!' });
    }

    res.locals.depositData = transactionData;

    next()
}

export {
    verifyTransaction,

}