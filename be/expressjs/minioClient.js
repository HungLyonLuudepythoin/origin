require("dotenv").config(); // Make sure this is at the very top

const { S3Client } = require("@aws-sdk/client-s3");

const endpointUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`;

const minioClient = new S3Client({
  region: "us-east-1",
  endpoint: endpointUrl,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

module.exports = minioClient;
