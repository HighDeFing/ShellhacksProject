import express from 'express';
import { createTeacher, readTeachers, updateTeacher, deleteTeacher } from './crud.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const teacher = req.body;
    const result = await createTeacher(teacher);
    res.send(result);
});

router.get('/read', async (req, res) => {
    const result = await readTeachers();
    res.send(result);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const teacher = req.body;
    const result = await updateTeacher(id, teacher);
    res.send(result);
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteTeacher(id);
    res.send(result);
});

export default router;