import { ObjectId } from "mongodb";
import {
  tutorCollection,
  studentCollection,
  coursesCollection,
} from "../../DataBase/config/db.js";
import bcrypt from "bcrypt";

// Function to create student record
export const createStudent = async (student) => {
  if (!student.password) {
    throw new Error("Password is required");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(student.password, 10);

  // Replace the plain password with the hashed password
  student.password = hashedPassword;

  const result = await studentCollection.insertOne(student);
  const newStudent = await studentCollection.findOne({
    _id: result.insertedId,
  });
  return newStudent;
};

// Function to get students
export const readStudents = async () => {
  return await studentCollection.find({}).toArray();
};

// Function to update student record
export const updateStudent = async (id, student) => {
  const objectId = new ObjectId(id);
  const updatedStudent = await studentCollection.updateOne(
    { _id: objectId },
    { $set: student }
  );
  return updatedStudent;
};

// Function to delete student record
export const deleteStudent = async (id) => {
  const objectId = new ObjectId(id);
  const updatedStudent = await studentCollection.deleteOne({ _id: objectId });
  return {
    deleted: true, // Will update later
  };
};

// Function to create tutor record
export const createTutor = async (tutor) => {
  if (!tutor.password) {
    throw new Error("Password is required");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(tutor.password, 10);

  // Replace the plain password with the hashed password
  tutor.password = hashedPassword;
  const result = await tutorCollection.insertOne(tutor);
  const newTutor = await tutorCollection.findOne({
    _id: result.insertedId,
  });
  return newTutor;
};

// Function to get tutors
export const readTutors = async () => {
  return await tutorCollection.find({}).toArray();
};

// Function to update tutor record
export const updateTutor = async (id, tutor) => {
  const objectId = new ObjectId(id);
  const updatedTutor = await tutorCollection.updateOne(
    { _id: objectId },
    { $set: tutor }
  );
  return updatedTutor;
};

// Function to delete tutor record
export const deleteTutor = async (id) => {
  const objectId = new ObjectId(id);
  const deletedTutor = await tutorCollection.deleteOne({ _id: objectId });
  return deletedTutor;
};

// Function to create subject record
export const createCourse = async (course) => {
  const result = await coursesCollection.insertOne(course);
  const newCourse = await coursesCollection.findOne({
    _id: result.insertedId,
  });
  return newCourse;
};

// Function to get subjects
export const readCourses = async () => {
  return await coursesCollection.find({}).toArray();
};

// Function to update subject record
export const updateCourse = async (id, course) => {
  const objectId = new ObjectId(id);
  const updatedCourse = await coursesCollection.updateOne(
      { _id: objectId },
      { $set: course }
  );
  return updatedCourse;
};

// Function to delete subject record
export const deleteCourse = async (id) => {
  const objectId = new ObjectId(id);
  const deletedCourse = await coursesCollection.deleteOne({ _id: objectId });
  return deletedCourse;
};
