const express = require('express');
const router = express.Router();
const db = require('../modules/db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Failed to fetch users');
  }
});

// Get donations of a user
router.get('/:id/donations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Donaters WHERE id_user = ?', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).send('Failed to fetch donations');
  }
});

// Get media files uploaded by a user
router.get('/:id/media', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Media_files WHERE id_user = ?', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching media files:', err);
    res.status(500).send('Failed to fetch media files');
  }
});

// Get posts created by a user
router.get('/:id/posts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Posts WHERE id_user = ?', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Failed to fetch posts');
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { ho_ten } = req.body;
    if (!ho_ten) return res.status(400).send('Missing name');
    const [result] = await db.query('INSERT INTO Users (`ho ten`) VALUES (?)', [ho_ten]);
    res.status(201).json({ id_user: result.insertId, ho_ten });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Failed to create user');
  }
});
// Upload media file record (metadata only, MinIO handles actual file)
router.post('/:id/media', async (req, res) => {
  try {
    const { file_name, file_type, file_url, minio_key } = req.body;
    const id_user = req.params.id;
    await db.query(
      'INSERT INTO Media_files (file_name, file_type, file_url, minio_key, id_user) VALUES (?, ?, ?, ?, ?)',
      [file_name, file_type, file_url, minio_key, id_user]
    );
    res.send('Media file metadata recorded');
  } catch (err) {
    console.error('Error recording media file:', err);
    res.status(500).send('Failed to record media file');
  }
});

// Create a post
router.post('/:id/posts', async (req, res) => {
  try {
    const { post } = req.body;
    const id_user = req.params.id;
    await db.query('INSERT INTO Posts (post, id_user) VALUES (?, ?)', [post, id_user]);
    res.send('Post created');
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).send('Failed to create post');
  }
});

// Get all data about the user

// Get all info about a user
router.get('/:id', async (req, res) => {
  const id_user = req.params.id;

  try {
    const [[user]] = await db.query('SELECT * FROM Users WHERE id_user = ?', [id_user]);
    if (!user) return res.status(404).send('User not found');

    const [donations] = await db.query('SELECT * FROM Donaters WHERE id_user = ?', [id_user]);
    const [mediaFiles] = await db.query('SELECT * FROM Media_files WHERE id_user = ?', [id_user]);
    const [posts] = await db.query('SELECT * FROM Posts WHERE id_user = ?', [id_user]);

    res.json({
      user,
      donations,
      mediaFiles,
      posts,
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Failed to fetch user data');
  }
});

module.exports = router;
