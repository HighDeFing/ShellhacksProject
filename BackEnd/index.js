import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

const app = express();
const port = 3000;

// Mount student routes to app (student CRUD endpoints)
app.use('/api', studentRoutes);

// Mount teacher routes to app (teacher CRUD endpoints)
app.use('/api', teacherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});