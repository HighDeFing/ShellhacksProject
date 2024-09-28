import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import './dotenv.js'

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let teacherCollection;
let studentCollection;

// Function will return a database object
const connectToDatabase = async () => {
    try {
        // Connect to database
        await client.connect();
        console.log('Connected to MongoDB');

        //Get 'schoolDatabase' database
        const db = client.db('schoolDatabase');

        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

// Function will create a collection
const createCollection = async (db, collectionName) => {
    try {
        // List collections by name
        const collections = await db.listCollections({ name: collectionName }).toArray();

        //Collection does not exist yet
        if (collections.length === 0) {
            await db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        
        // Collection already exists
        } else {
            console.log(`Collection ${collectionName} already exists`);
        }
    } catch (error) {
        console.error(`Error creating collection ${collectionName}`, error);
    }
};

// Function will add student and teacher (tutor) data to the collections
const addDummyData = async (db) => {
    try {
        // Define collections
        teacherCollection = db.collection('Teacher');
        studentCollection = db.collection('Student');

        // Read and parse the students.json file
        const studentsFilePath = path.join('../data', 'students.json');
        const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));

        // Insert the parsed data into the Student collection
        await studentCollection.insertMany(studentsData);
        console.log('Student data inserted successfully');

        // Read and parse the teachers.json file
        const teachersFilePath = path.join('../data', 'teachers.json');
        const teachersData = JSON.parse(fs.readFileSync(teachersFilePath, 'utf8'));

        // Insert the parsed data into the Teacher collection
        await teacherCollection.insertMany(teachersData);
        console.log('Teacher data inserted successfully');
    } catch (error) {
        console.error('Error adding dummy data', error);
    } finally {
        process.exit();
    }
};

// Function will initialize a database with collections and data
const initCollections = async () => {
    const db = await connectToDatabase();
    await createCollection(db, 'Teacher');
    await createCollection(db, 'Student');
    await addDummyData(db);
};

export { initCollections, teacherCollection, studentCollection };