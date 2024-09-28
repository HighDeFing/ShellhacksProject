import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

const app = express();

// Mount student routes to app (student CRUD endpoints)
app.use('/api/students', studentRoutes);

// Mount teacher routes to app (teacher CRUD endpoints)
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});