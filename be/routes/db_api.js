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

// Get random posts
router.get('/random-posts', async (req, res) => {
  try {
    // Get the number of posts to return from query parameter, default to 1 if not provided
    const numPosts = Math.min(parseInt(req.query.num) || 1, 20); // Limit to a maximum of 20 posts

    // Validate that numPosts is a positive integer
    if (numPosts <= 0) {
      return res.status(400).send('Number of posts must be a positive integer.');
    }

    let randomPosts = [];
    let foundPosts = 0;
    let seenPostIds = new Set(); // To keep track of already fetched posts

    // Loop to find the required number of posts
    while (foundPosts < numPosts) {
      let randomUserId = null;
      let randomPost = null;

      // Get a random user
      const [randomUser] = await db.query('SELECT id_user FROM Users ORDER BY RAND() LIMIT 1');
      if (!randomUser.length) return res.status(404).send('No users found');

      randomUserId = randomUser[0].id_user;

      // Get a random post from that user
      const [posts] = await db.query('SELECT * FROM Posts WHERE id_user = ? ORDER BY RAND() LIMIT 1', [randomUserId]);

      if (posts.length > 0) {
        randomPost = posts[0];

        // Check if the post is already selected (using its post ID)
        if (!seenPostIds.has(randomPost.id_post)) {
          randomPosts.push({
            userId: randomUserId,
            post: randomPost
          });
          seenPostIds.add(randomPost.id_post); // Mark the post as seen
          foundPosts++;
        }
      }

      // If there are no posts found, we need to check if there are any other users left
      const [allUsers] = await db.query('SELECT id_user FROM Users');
      if (allUsers.length === 0) {
        return res.status(404).send('No posts available from any user');
      }
    }

    // Send the response with the random posts and user info
    res.json(randomPosts);
  } catch (err) {
    console.error('Error fetching random posts:', err);
    res.status(500).send('Failed to fetch random posts');
  }
});

// // Create a new user
// router.post('/users', async (req, res) => {
//   try {
//     const { ho_ten } = req.body;
//     if (!ho_ten) return res.status(400).send('Missing name');
//     const [result] = await db.query('INSERT INTO Users (`ho_ten`) VALUES (?)', [ho_ten]);
//     res.status(201).json({ id_user: result.insertId, ho_ten });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).send('Failed to create user');
//   }
// });

// Add a donation record
router.post('/users/donate', async (req, res) => {
  try {
    const { magiaodich, sotien, ngaydonate, id_user, description } = req.body;
    await db.query(
      'INSERT INTO Donaters (magiaodich, sotien, ngaydonate, id_user, mota) VALUES (?, ?, ?, ?, ?)',
      [magiaodich, sotien, ngaydonate, id_user, description]
    );
    res.send('Donation recorded');
  } catch (err) {
    console.error('Error recording donation:', err);
    res.status(500).send('Failed to record donation');
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
