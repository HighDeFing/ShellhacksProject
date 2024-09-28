import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import { initCollections } from '../DataBase/config/db.js';

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    // Initialize collections
    await initCollections();
    console.log('Database collections initialized');

    // Mount student routes to app (student CRUD endpoints)
    app.use('/api/students', studentRoutes);

    // Mount teacher routes to app (teacher CRUD endpoints)
    app.use('/api/teachers', teacherRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database collections', error);
    process.exit(1);
  }
};

startServer();