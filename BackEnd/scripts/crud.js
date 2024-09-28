import { ObjectId } from 'mongodb';
import { teacherCollection, studentCollection } from '../../DataBase/config/db.js';


// Function to create student record
export const createStudent = async (student) => {
    const result = await studentCollection.insertOne(student);
    return result.ops[0];
};

// Function to get students
export const readStudents = async () => {
    return await studentCollection.find({}).toArray();
};

// Function to update student record
export const updateStudent = async (id, student) => {
    const result = await studentCollection.updateOne({ _id: ObjectId(id) }, { $set: student });
    return result.modifiedCount > 0;
};

// Function to delete student record
export const deleteStudent = async (id) => {
    const result = await studentCollection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount > 0;
};

// Function to create teacher record
export const createTeacher = async (teacher) => {
    const result = await teacherCollection.insertOne(teacher);
    return result.ops[0];
};

// Function to get teachers
export const readTeachers = async () => {
    return await teacherCollection.find({}).toArray();
};

// Function to update teacher record
export const updateTeacher = async (id, teacher) => {
    const result = await teacherCollection.updateOne({ _id: ObjectId(id) }, { $set: teacher });
    return result.modifiedCount > 0;
};

// Function to delete teacher record
export const deleteTeacher = async (id) => {
    const result = await teacherCollection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount > 0;
};