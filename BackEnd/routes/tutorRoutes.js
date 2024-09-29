import express from "express";
import {
  createTutor,
  readTutors,
  updateTutor,
  deleteTutor,
} from "../scripts/crud.js";
import { tutorCollection } from "../../DataBase/config/db.js";
import { coursesCollection } from "../../DataBase/config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/create", async (req, res) => {
  const tutor = req.body;
  const result = await createTutor(tutor);
  res.send(result);
});

router.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const objectId = new ObjectId(id);
    const tutor = await tutorCollection.findOne({ _id: objectId });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.send(tutor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/read", async (req, res) => {
  const result = await readTutors();
  res.send(result);
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const tutor = req.body;
  const result = await updateTutor(id, tutor);
  res.send(result);
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTutor(id);
  res.send(result);
});

router.get('/readcourse/:id', async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await coursesCollection.findOne({ id: parseInt(courseId, 10) });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const tutors = await tutorCollection.find({ course_id: { $in: [course.id] } }).toArray();
    res.send(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
