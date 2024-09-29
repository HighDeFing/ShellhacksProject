import express from 'express';
import { createCourse, readCourses, updateCourse, deleteCourse } from '../scripts/crud.js';
import { ObjectId } from 'mongodb';
import { coursesCollection } from '../../DataBase/config/db.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const course = req.body;
    const result = await createCourse(course);
    res.send(result);
});

router.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const objectId = new ObjectId(id);
        const courses = await coursesCollection.findOne({ _id: objectId });
        if (!courses) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.send(courses);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/read', async (req, res) => {
    const result = await readCourses();
    res.send(result);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const course = req.body;
    const result = await updateCourse(id, course);
    res.send(result);
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteCourse(id);
    res.send(result);
});

export default router;