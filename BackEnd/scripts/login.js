import express from "express";
import { studentCollection, teacherCollection } from "../../DataBase/config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required" });
    }

    try {
        const collection = role === "student" ? studentCollection : teacherCollection;
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role }, "your_jwt_secret", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;