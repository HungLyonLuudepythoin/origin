// routes/minio_api.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const minioClient = require("../modules/minio_client");

const router = express.Router();
const BUCKET_NAME = "webdev2025"; // Your MinIO bucket name

// ------------------------
// File listing
// ------------------------
router.get("/files", async (req, res) => {
  const folderPath = req.query.path; // Get the folder path from query parameter
  
  if (!folderPath) {
    return res.status(400).json({ error: "Missing folder path" });
  }

  const stream = minioClient.listObjectsV2(BUCKET_NAME, folderPath, true);
  const files = [];

  stream.on("data", (obj) => files.push(obj.name));
  stream.on("end", () => res.json({ files }));
  stream.on("error", (err) => {
    console.error("Error listing files:", err);
    res.status(500).json({ error: "Failed to list files" });
  });
});

// ------------------------
// File preview (stream)
// ------------------------
router.get("/preview", async (req, res) => {
  const filePath = req.query.path; // Get file path from query parameter
  
  if (!filePath) {
    return res.status(400).json({ error: "Missing file path" });
  }

  try {
    const stat = await minioClient.statObject(BUCKET_NAME, filePath);
    const contentType = stat.metaData["content-type"] || "application/octet-stream";
    
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${filePath.split('/').pop()}"`);

    const stream = await minioClient.getObject(BUCKET_NAME, filePath);
    stream.pipe(res);
    
    stream.on("error", (err) => {
      console.error("Error streaming the file:", err);
      res.status(500).json({ error: "Error while streaming the file" });
    });
  } catch (err) {
    console.error("Error previewing file:", err);
    res.status(500).json({ error: "Failed to preview file" });
  }
});

// ------------------------
// File download
// ------------------------
router.get("/file", async (req, res) => {
  const filePath = req.query.path; // Get file path from query parameter
  
  if (!filePath) return res.status(400).json({ error: "Missing file path" });

  try {
    const stat = await minioClient.statObject(BUCKET_NAME, filePath);
    res.setHeader("Content-Type", stat.metaData["content-type"] || "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(filePath)}"`);

    const stream = await minioClient.getObject(BUCKET_NAME, filePath);
    stream.pipe(res);
  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).json({ error: "Failed to download file" });
  }
});

// ------------------------
// File upload
// ------------------------
router.post("/files/:path", async (req, res) => {
  const folderPath = req.params.path; // Get path from URL (images, videos, posts)

  if (!folderPath) {
    return res.status(400).json({ error: "No folder path specified" });
  }

  // Validate folder path
  const validFolders = ["images", "videos", "posts"];
  if (!validFolders.includes(folderPath)) {
    return res.status(400).json({ error: "Invalid folder path" });
  }

  try {
    if (!req.is("multipart/form-data")) {
      return res.status(400).json({ error: "Content-Type must be multipart/form-data" });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Error parsing the form data" });
      }

      const file = files.file[0]; // Assuming the form contains a single file field called 'file'

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const filePath = path.join(folderPath, path.basename(file.originalFilename)); // Construct the full file path
      const metaData = {
        "Content-Type": file.mimetype,
      };

      // Upload the file to MinIO (S3 compatible)
      await minioClient.putObject(
        BUCKET_NAME,
        filePath, // Use the dynamic folder path
        fs.createReadStream(file.filepath),
        metaData
      );

      res.send("File uploaded successfully");
    });
  } catch (err) {
    console.error("Error uploading file to Minio", err);
    res.status(500).send("File upload failed");
  }
});

module.exports = router;
