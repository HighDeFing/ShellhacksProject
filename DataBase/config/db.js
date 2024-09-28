import { MongoClient, ServerApiVersion } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined, please check .env");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let tutorCollection;
let studentCollection;

let subjectCollection;

// Function will return a database object
const connectToDatabase = async () => {
  try {
    // Connect to database
    await client.connect();
    console.log("Connected to MongoDB");

    //Get 'schoolDatabase' database
    const db = client.db("schoolDatabase");

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

// Function will create a collection
const createCollection = async (db, collectionName) => {
  console.log("Creating collections...");
  try {
    // List collections by name
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    //Collection does not exist yet
    if (collections.length === 0) {
      await db.createCollection(collectionName);
      console.log(`Collection ${collectionName} created`);

      // Collection already exists
    } else {
      console.log(`Collection ${collectionName} already exists`);
    }
  } catch (error) {
    console.error(`Error creating collection ${collectionName}`, error);
  }
};

// Function will add student and tutor (tutor) data to the collections
const addDummyData = async (db) => {
  try {
    tutorCollection = db.collection("Tutor");
    studentCollection = db.collection("Student");
    subjectCollection = db.collection("Subject");

    const subjectCount = await subjectCollection.countDocuments();
    if (subjectCount === 0) {
      const subjectsFilePath = path.join(__dirname, "../data", "subjects.json");
      const subjectsData = JSON.parse(fs.readFileSync(subjectsFilePath, "utf8"));
      await subjectCollection.insertMany(subjectsData);
      console.log("Subject data inserted successfully");
    } else {
      console.log("Subject collection is not empty");
    }

    const studentCount = await studentCollection.countDocuments();
    if (studentCount === 0) {
      const studentsFilePath = path.join(__dirname, "../data", "students.json");
      const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, "utf8"));

      for (let student of studentsData) {
        student.password = await bcrypt.hash(student.password, 10);
      }

      await studentCollection.insertMany(studentsData);
      console.log("Student data inserted successfully");
    } else {
      console.log("Student collection is not empty");
    }

    const tutorCount = await tutorCollection.countDocuments();
    if (tutorCount === 0) {
      const tutorsFilePath = path.join(__dirname, "../data", "tutors.json");
      const tutorsData = JSON.parse(fs.readFileSync(tutorsFilePath, "utf8"));

      for (let tutor of tutorsData) {
        tutor.password = await bcrypt.hash(tutor.password, 10);
      }

      await tutorCollection.insertMany(tutorsData);
      console.log("Tutor data inserted successfully");
    } else {
      console.log("Tutor collection is not empty");
    }
  } catch (error) {
    console.error("Error adding dummy data", error);
  }
};

// Function will initialize a database with collections and data
const initCollections = async () => {
  const db = await connectToDatabase();
  await createCollection(db, "Tutor");
  await createCollection(db, "Student");
  await createCollection(db, "Subject");
  await addDummyData(db);
};

export { initCollections, tutorCollection, studentCollection, subjectCollection };
