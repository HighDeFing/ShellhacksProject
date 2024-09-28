import express from 'express';
import { createStudent, readStudents, updateStudent, deleteStudent } from '../scripts/crud.js';
import {ObjectId} from "mongodb";
import {studentCollection, tutorCollection} from "../../DataBase/config/db.js";

const router = express.Router();

router.post('/create', async (req, res) => {
    const student = req.body;
    const result = await createStudent(student);
    res.send(result);
});

router.get("/read/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const objectId = new ObjectId(id);
        const student = await studentCollection.findOne({ _id: objectId });
        if (!student) {
            return res.status(404).json({ message: "Tutor not found" });
        }
        res.send(student);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
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