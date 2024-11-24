import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authRouters from './routers/auth.routers.js'
import transactionRouters from './routers/transactions.routers.js'
import usersRouters from './routers/users.routers.js'

const app = express()

app.use(cors());

app.use(express.json())

app.use(authRouters);
app.use(usersRouters);
app.use(transactionRouters);

app.listen(5000, () => {
    console.log('Run in http://localhost:5000/')
})