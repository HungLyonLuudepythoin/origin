// app.js
const express = require("express");
const { ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const minioClient = require("./minioClient");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const PORT = 3000;

const BUCKET_NAME = "webdev2025";
const PREFIX = "images/"; // folder you created on the UI

app.get("/files", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: PREFIX,
    });

    const data = await minioClient.send(command);
    const files = data.Contents?.map((item) => item.Key) || [];
    res.json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list files" });
  }
});

app.get("/file", async (req, res) => {
  const fileKey = req.query.key; // pass full object key in query, e.g. your-folder/myfile.txt
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });

    const url = await getSignedUrl(minioClient, command, { expiresIn: 3600 });
    res.json({ downloadUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/preview", async (req, res) => {
    const fileKey = req.query.key; // e.g. images/photo.jpg
    if (!fileKey) return res.status(400).send("Missing file key");
  
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
      });
  
      const data = await minioClient.send(command);
  
      // Set content type from the headers MinIO returns (if available)
      const contentType = data.ContentType || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
  
      // Pipe the file stream directly to the response
      data.Body.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to preview file" });
    }
  });
  