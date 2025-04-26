// modules/minio_client.js
const Minio = require("minio");
require("dotenv").config(); // Load environment variables from .env file

// Get MinIO config from .env file
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME; // Use the bucket name from .env

// Minio client setup using .env variables
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_END_POINT,  // Use MINIO_END_POINT from .env
  port: parseInt(process.env.MINIO_PORT, 10) || 9000,  // Use MINIO_PORT from .env, ensure it's an integer
  useSSL: process.env.MINIO_USE_SSL === "true",  // Use MINIO_USE_SSL from .env (boolean)
  accessKey: process.env.MINIO_ACCESS_KEY,  // Use MINIO_ACCESS_KEY from .env
  secretKey: process.env.MINIO_SECRET_KEY,  // Use MINIO_SECRET_KEY from .env
});

// Check and create bucket if not exists
const initMinio = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
      console.log(`✅ Bucket "${BUCKET_NAME}" created`);
    } else {
      console.log(`📦 Bucket "${BUCKET_NAME}" already exists`);
    }
  } catch (err) {
    console.error("❌ Error in Minio bucket check:", err);
  }
};

initMinio();

module.exports = minioClient;
