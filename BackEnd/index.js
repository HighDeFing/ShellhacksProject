import express, { json } from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import { initCollections } from "../DataBase/config/db.js";
import loginRoutes from "./scripts/login.js";
import courseRoutes from "./routes/courseRoutes.js";
import session from 'express-session';


const app = express();


// Configure session middleware
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());
app.use(cors());


const startServer = async () => {
  try {
    // Initialize collections
    await initCollections();
    console.log("Database collections initialized");

    // Mount subject routes to app (subject CRUD endpoints)
    app.use("/api/courses", courseRoutes);

    // Mount student routes to app (student CRUD endpoints)
    app.use("/api/students", studentRoutes);

    // Mount tutor routes to app (tutor CRUD endpoints)
    app.use("/api/tutors", tutorRoutes);

    app.use("/api", loginRoutes);



    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing database collections", error);
    process.exit(1);
  }
};

startServer();
