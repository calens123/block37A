const express = require("express");
const prisma = require("../prisma/prisma"); // Use the shared Prisma client
const router = express.Router();

// Get all items
router.get("/", async (req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Get a specific item
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await prisma.item.findUnique({ where: { id } });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create a new item
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const item = await prisma.item.create({ data: { name, description } });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

// Update an item
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const item = await prisma.item.update({
      where: { id },
      data: { name, description },
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Delete an item
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.item.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
