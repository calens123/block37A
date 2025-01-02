const express = require("express");
const prisma = require("../prisma/prisma"); // Use the shared Prisma client
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

// Update a review
router.put("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.reviewId, 10);
    const { text, score } = req.body;

    const review = await prisma.review.update({
      where: { id: reviewId },
      data: { text, score },
    });

    res.json(review);
  } catch (error) {
    next(error);
  }
});

// Delete a review
router.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.reviewId, 10);

    await prisma.review.delete({ where: { id: reviewId } });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
