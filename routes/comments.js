const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken"); // Ensure this import is added

// Add a comment to a review
router.post("/:itemId/reviews/:reviewId/comments", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({ message: "Text and userId are required." });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        reviewId: parseInt(reviewId, 10),
        userId: parseInt(userId, 10),
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Get all comments by the logged-in user
router.get("/me", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token required." });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );
    const userId = decoded.userId;

    // Fetch comments by the user
    const comments = await prisma.comment.findMany({
      where: { userId },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Update a comment
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required." });
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { text },
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// Delete a comment
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
