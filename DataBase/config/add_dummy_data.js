import connectToDatabase from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addDummyData = async () => {

    try {
    const db = await connectToDatabase();

    const teacherCollection = db.collection('Teacher');
    const studentCollection = db.collection('Student');

        // Read and parse the students.json file
    const studentsFilePath = path.join(__dirname, '../data', 'students.json');
    const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));

    // Insert the parsed data into the Student collection
    await studentCollection.insertMany(studentsData);
    console.log('Student data inserted successfully');

    // Read and parse the teachers.json file
    const teachersFilePath = path.join(__dirname, '../data', 'teachers.json');
    const teachersData = JSON.parse(fs.readFileSync(teachersFilePath, 'utf8'));

    // Insert the parsed data into the Teacher collection
    await teacherCollection.insertMany(teachersData);
    console.log('Teacher data inserted successfully');

    } catch (error) {
        console.error('Error adding dummy data', error);
    } finally {
        // Terminate the program
        process.exit();
    }

}

addDummyData();
