const express = require("express");
const prisma = require("../prisma/prisma"); // Use the shared Prisma client
const jwt = require("jsonwebtoken"); // Ensure JWT is imported
const router = express.Router();

// Get all reviews for an item
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const reviews = await prisma.review.findMany({ where: { itemId } });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Add a review for an item
router.post("/:id/reviews", async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const { text, score, userId } = req.body;

    if (!text || !score || !userId) {
      return res
        .status(400)
        .json({ message: "Text, score, and userId are required." });
    }

    const review = await prisma.review.create({
      data: { text, score, userId, itemId },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

// Get all reviews for the authenticated user
router.get("/me", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const reviews = await prisma.review.findMany({
      where: { userId },
    });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// Update a review for a specific user
router.put("/users/:userId/reviews/:id", async (req, res, next) => {
  try {
    const { userId, id } = req.params;
    const { text, score } = req.body;

    if (!text || !score) {
      return res.status(400).json({ message: "Text and score are required." });
    }

    // Verify the review belongs to the user
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!review || review.userId !== parseInt(userId, 10)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review." });
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id, 10) },
      data: { text, score },
    });

    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
});

// Delete a review for a specific user
router.delete("/users/:userId/reviews/:id", async (req, res, next) => {
  try {
    const { userId, id } = req.params;

    // Verify the review belongs to the user
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!review || review.userId !== parseInt(userId, 10)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review." });
    }

    // Delete the review
    await prisma.review.delete({
      where: { id: parseInt(id, 10) },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
