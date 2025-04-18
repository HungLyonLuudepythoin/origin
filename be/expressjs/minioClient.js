// minioClient.js
const { S3Client } = require("@aws-sdk/client-s3");

const minioClient = new S3Client({
  region: "us-east-1", // MinIO doesn't care, but AWS SDK requires this
  endpoint: "http://localhost:9000", // change to your MinIO endpoint
  forcePathStyle: true, // required for MinIO
  credentials: {
    accessKeyId: "uhdgXistk3kpPZw8bMxs",
    secretAccessKey: "7ZBXvJ7A12K6941ruhjoeI95lLdxyllyUAIzjAnz",
  },
});

module.exports = minioClient;
