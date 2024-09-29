import express from "express";
import {
  studentCollection,
  tutorCollection,
} from "../../DataBase/config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createStudent, createTutor } from "./crud.js";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required" });
  }

  try {
    const collection = role === "student" ? studentCollection : tutorCollection;
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token,  user: { id: user._id, email: user.email, role } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign up route
router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  let record = {};

  const errors = [];
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email) {
    errors.push("Email is required");
  }

  if (!password) {
    errors.push("Password is required");
  }

  if (!role) {
    errors.push("Role is required");
  }

  if (!passwordRegex.test(password)) {
    errors.push("Invalid password");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (role === "student") {
    record = await createStudent({
        email,
        password
    });
  } else {
    record = await createTeacher({
        email,
        password
    });
  }
  
  console.log(record)
  return res.status(200).send(record);
});

export default router;
