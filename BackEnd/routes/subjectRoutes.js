import express from 'express';
import { createSubject, readSubjects, updateSubject, deleteSubject } from '../scripts/crud.js';
import { ObjectId } from 'mongodb';
import { subjectCollection } from '../../DataBase/config/db.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const subject = req.body;
    const result = await createSubject(subject);
    res.send(result);
});

router.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const objectId = new ObjectId(id);
        const subject = await subjectCollection.findOne({ _id: objectId });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.send(subject);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/read', async (req, res) => {
    const result = await readSubjects();
    res.send(result);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const subject = req.body;
    const result = await updateSubject(id, subject);
    res.send(result);
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteSubject(id);
    res.send(result);
});

export default router;