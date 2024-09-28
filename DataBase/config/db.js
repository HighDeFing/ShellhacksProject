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

const createCollection = async (db, collectionName) => {
    try {
        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            await db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        } else {
            console.log(`Collection ${collectionName} already exists`);
        }
    } catch (error) {
        console.error(`Error creating collection ${collectionName}`, error);
    }
}

const initCollections = async () => {
    const db = await connectToDatabase();
    await createCollection(db, 'Teacher');
    await createCollection(db, 'Student');
}

export { connectToDatabase, initCollections }