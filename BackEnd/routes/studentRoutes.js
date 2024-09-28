import express from 'express';
import { createStudent, readStudents, updateStudent, deleteStudent } from './crud.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const student = req.body;
    const result = await createStudent(student);
    res.send(result);
});

router.get('/read', async (req, res) => {
    const result = await readStudents();
    res.send(result);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const student = req.body;
    const result = await updateStudent(id, student);
    res.send(result);
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteStudent(id);
    res.send(result);
});

export default router;