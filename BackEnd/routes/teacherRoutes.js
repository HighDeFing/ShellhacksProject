import express from 'express';
import { createTeacher, readTeachers, updateTeacher, deleteTeacher } from '../scripts/crud.js';
import { teacherCollection } from '../../DataBase/config/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/create', async (req, res) => {
    const teacher = req.body;
    const result = await createTeacher(teacher);
    res.send(result);
});

router.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const objectId = new ObjectId(id);
        const teacher = await teacherCollection.findOne({ _id: objectId });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.send(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
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