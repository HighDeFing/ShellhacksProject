// File: `server.js`
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fetchTeachers } from './scripts/crud.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Fetch teachers
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await fetchTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).send('Error fetching teachers');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});