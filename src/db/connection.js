import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const db = mongoClient.db('myfinances');

export default db;