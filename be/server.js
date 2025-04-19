// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/db_api");
const minioRoutes = require("./routes/minio_api");

// Prefix routes
app.use("/db", userRoutes);       // MariaDB API routes
app.use("/minio", minioRoutes);   // MinIO file API routes

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
