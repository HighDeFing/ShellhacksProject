// File: `server.js`
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createStudent, readStudents, updateStudent, deleteStudent } from './crud.js';
import connectToDatabase from '../../DataBase/config/db.js';

const router = express.Router();

const initCollection = async () => {
    const db = await connectToDatabase();

    const teacherCollection = db.collection('Teacher');
    const studentCollection = db.collection('Student');
}

router.post('/api/create_student', async (req, res) => {
    const student = req.body;
    const result = await createStudent(student);
    res.send(result);
}