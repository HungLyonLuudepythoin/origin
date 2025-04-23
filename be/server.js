// server.js
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// If someone accesses "/", send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Routes
const userRoutes = require("./routes/db_api");
const minioRoutes = require("./routes/minio_api");
const paymentRoutes = require("./routes/donate")
// Prefix routes
app.use("/api/user", userRoutes);    
app.use("/api/minio", minioRoutes);   
app.use("/api/donate", paymentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
