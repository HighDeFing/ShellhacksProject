import { ObjectId } from 'mongodb';
import { teacherCollection, studentCollection } from '../../DataBase/config/db.js';

// Function to create student record
export const createStudent = async (student) => {
    const result = await studentCollection.insertOne(student);
    const newStudent = await studentCollection.findOne({ _id: result.insertedId });
    return newStudent;
};

// Function to get students
export const readStudents = async () => {
    return await studentCollection.find({}).toArray();
};

// Function to update student record
export const updateStudent = async (id, student) => {
    const objectId = new ObjectId(id);
    const updatedStudent = await studentCollection.updateOne({ _id: objectId }, { $set: student });
    return updatedStudent;
};

// Function to delete student record
export const deleteStudent = async (id) => {
    const objectId = new ObjectId(id);
    const updatedStudent = await studentCollection.deleteOne({ _id: objectId });
    return {
        "deleted": true // Will update later
    };
};

// Function to create teacher record
export const createTeacher = async (teacher) => {
    const result = await teacherCollection.insertOne(teacher);
    const newTeacher = await teacherCollection.findOne({ _id: result.insertedId });
    return newTeacher;
};

// Function to get teachers
export const readTeachers = async () => {
    return await teacherCollection.find({}).toArray();
};

// Function to update teacher record
export const updateTeacher = async (id, teacher) => {
    const objectId = new ObjectId(id);
    const updatedTeacher = await teacherCollection.updateOne({ _id: objectId }, { $set: teacher });
    return updatedTeacher;
};

// Function to delete teacher record
export const deleteTeacher = async (id) => {
    const objectId = new ObjectId(id);
    const deletedTeacher = await teacherCollection.deleteOne({ _id: objectId });
    return deletedTeacher;
};