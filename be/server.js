// server.js
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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
const paymentRoutes = require("./routes/donate");
const authRoutes = require("./routes/auth");

// Prefix routes
app.use("/api/user", userRoutes);    
app.use("/api/minio", minioRoutes);   
app.use("/api/donate", paymentRoutes);
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
