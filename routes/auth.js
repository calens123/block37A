const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma"); // Importing shared prisma instance
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: { username, email, passwordHash: hashedPassword },
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
});

// Login a user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Create a JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// Fetch the logged-in user
router.get("/me", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token required." });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
