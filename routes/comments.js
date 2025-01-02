const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prisma").default;

// Add a comment to a review
router.post("/reviews/:id/comments", async (req, res, next) => {
  try {
    const reviewId = +req.params.id;
    const { text, userId } = req.body;
    const comment = await prismaClient.comment.create({
      data: { text, reviewId, userId },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Update a comment
router.put("/comments/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { text } = req.body;
    const comment = await prismaClient.comment.update({
      where: { id },
      data: { text },
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// Delete a comment
router.delete("/comments/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prismaClient.comment.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
