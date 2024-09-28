// File: `crud.js`
import connectToDatabase from '../../DataBase/config/db.js';

const fetchTeachers = async () => {
    const db = await connectToDatabase();
    const collection = db.collection('Teacher');
    const teachers = await collection.find({}).toArray();
    console.log('Teachers fetched:', teachers);
    return teachers;
};

export { fetchTeachers };