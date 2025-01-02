const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const reviewRoutes = require("./routes/reviews");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/items", reviewRoutes); // Adjusted to mount review routes under `/api/items`
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal server error." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
