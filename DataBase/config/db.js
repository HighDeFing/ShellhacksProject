import { MongoClient } from 'mongodb';

import './dotenv.js';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('schoolDatabase');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

export default connectToDatabase;