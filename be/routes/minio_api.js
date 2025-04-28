// routes/minio_api.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const minioClient = require("../modules/minio_client");

const router = express.Router();
const BUCKET_NAME = "webdev2025"; // Your MinIO bucket name

// ------------------------
// List all unique folders (user_ids) in MinIO
// ------------------------
router.get("/list", async (req, res) => {
  try {
    const stream = minioClient.listObjectsV2(BUCKET_NAME, "", true); // recursive = true
    const foldersSet = new Set();

    stream.on("data", (obj) => {
      const pathParts = obj.name.split("/");
      if (pathParts.length > 1 && pathParts[0]) {
        foldersSet.add(pathParts[0]); // add only top-level folder (user_id)
      }
    });

    stream.on("end", () => {
      const folders = Array.from(foldersSet);
      res.json({ paths: folders });
    });

    stream.on("error", (err) => {
      console.error("Error listing folders:", err);
      res.status(500).json({ error: "Failed to list folders" });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

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

// ------------------------
// Get N random user_id folders, pick one random media per user, return URLs
// ------------------------
router.get("/random-media", async (req, res) => {
  const num = parseInt(req.query.num) || 1; // Default to 1 if not provided
  // console.log(`Requested number of random media: ${num}`);

  try {
    // Step 1: Get list of folders (user_ids) using the /list endpoint
    const listStream = minioClient.listObjectsV2(BUCKET_NAME, "", false); // List top-level folders
    const foldersSet = new Set();
    // console.log("Listing folders...");

    listStream.on("data", (obj) => {
      // console.log("Received object:", obj); // Log entire object for debugging

      if (obj && obj.prefix) { // Check if obj.prefix exists (indicating a folder)
        const pathParts = obj.prefix.split("/");
        if (pathParts.length > 1 && pathParts[0]) {
          foldersSet.add(pathParts[0]); // Only the top-level folder (user_id)
        }
      } else {
        console.log("Received an object without a prefix or invalid object");
      }
    });

    listStream.on("end", async () => {
      const folderList = Array.from(foldersSet);
      // console.log("Found folders:", folderList);

      if (folderList.length === 0) {
        console.log("No user folders found");
        return res.status(404).json({ error: "No user folders found" });
      }

      // Step 2: Pick `num` random folders
      const randomFolders = [];
      while (randomFolders.length < Math.min(num, folderList.length)) {
        const randomFolder = folderList[Math.floor(Math.random() * folderList.length)];
        if (!randomFolders.includes(randomFolder)) {
          randomFolders.push(randomFolder);
        }
      }
      // console.log("Selected random folders:", randomFolders);

      // Step 3: Get a random file from each chosen folder
      const results = [];
      for (const folder of randomFolders) {
        // console.log(`Listing files in folder: ${folder}`);
        const userFilesStream = minioClient.listObjectsV2(BUCKET_NAME, `${folder}/`, true);
        const userFiles = [];

        await new Promise((resolve, reject) => {
          userFilesStream.on("data", (obj) => {
            if (obj && obj.name && !obj.name.endsWith("/")) { // Skip folder prefixes and undefined names
              userFiles.push(obj.name);
            }
          });
          userFilesStream.on("end", resolve);
          userFilesStream.on("error", reject);
        });

        // console.log(`Found ${userFiles.length} files in folder ${folder}`);

        // Step 4: If there are files, pick a random file and generate the preview URL
        if (userFiles.length > 0) {
          const randomFile = userFiles[Math.floor(Math.random() * userFiles.length)];
          // console.log(`Picked random file: ${randomFile}`);

          const previewUrl = `/api/minio/preview?path=${encodeURIComponent(randomFile)}`;
          results.push({
            user_id: folder,
            file: randomFile,
            preview_url: previewUrl
          });
        } else {
          // console.log(`No media files found in folder: ${folder}`);
        }
      }

      // Return the results
      // console.log("Returning results:", results);
      res.json({ results });
    });

    listStream.on("error", (err) => {
      console.error("Error listing folders:", err);
      res.status(500).json({ error: "Failed to list user folders" });
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});


module.exports = router;
