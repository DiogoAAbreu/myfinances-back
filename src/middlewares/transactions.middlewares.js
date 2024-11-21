import { createDepositSchema } from "../schemas/transactions.schemas.js";

async function verifyDeposit(req, res, next) {
    const { description, value } = req.body;

    const depositData = { description, value }

    const validDeposit = createDepositSchema.valid(depositData);

    if (validDeposit.error) {
        return res.status(422).send({ message: 'Verifique as informações e tente novamente!' });
    }

    res.locals.depositData = depositData;

    next()
}

export {
    verifyDeposit,

}