import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is not defined, please check .env");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

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
    console.log('Creating collections...')
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

        // Check if the Student collection is empty
        const studentCount = await studentCollection.countDocuments();
        if (studentCount === 0) {
            // Read and parse the students.json file
            const studentsFilePath = path.join(__dirname, '../data', 'students.json');
            const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));

            // Insert the parsed data into the Student collection
            await studentCollection.insertMany(studentsData);
            console.log('Student data inserted successfully');
        } else {
            console.log('Student collection is not empty');
        }

        // Check if the Teacher collection is empty
        const teacherCount = await teacherCollection.countDocuments();
        if (teacherCount === 0) {
            // Read and parse the teachers.json file
            const teachersFilePath = path.join(__dirname, '../data', 'teachers.json');
            const teachersData = JSON.parse(fs.readFileSync(teachersFilePath, 'utf8'));

            // Insert the parsed data into the Teacher collection
            await teacherCollection.insertMany(teachersData);
            console.log('Teacher data inserted successfully');
        } else {
            console.log('Teacher collection is not empty');
        }
    } catch (error) {
        console.error('Error adding dummy data', error);
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