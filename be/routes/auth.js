const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../modules/db');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Signup 
router.post('/signup', async (req, res) => {
    const { ho_ten, username, email, phone, password } = req.body;

    // Check if required fields are present
    if (!ho_ten || !username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if user already exists by username or email
        const [existing] = await db.query(
            'SELECT `id_user`, `ho_ten`, `username`, `email`, `phone`, `created_at` FROM Users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existing.length > 0) {
            return res.status(200).json({ message: 'User already exists', user: existing });
        }

        // Hash the password
        const hash = await bcrypt.hash(password.trim(), 10);

        // Insert new user
        const [result] = await db.query(
            'INSERT INTO Users (`ho_ten`, username, email, phone, password, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
            [ho_ten, username, email, phone, hash]
        );

        res.status(201).json({ message: 'User registered successfully', id_user: result.insertId });

    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ message: 'Missing username/email or password' });
    }

    try {
        // Find user by username or email
        const [rows] = await db.query(
            'SELECT * FROM Users WHERE username = ? OR email = ?',
            [usernameOrEmail.trim(), usernameOrEmail.trim()]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials name or email' });
        }

        const user = rows[0];

        // Compare password with stored hash
        console.log("Password:", password);
        const match = await bcrypt.compare(password.trim(), user.password);
        console.log("Password match result:", match);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials password' });
        }

        // Prepare user data to return (exclude password)
        const userData = {
            id_user: user.id_user,
            ho_ten: user["ho_ten"],
            username: user.username,
            email: user.email,
            phone: user.phone,
            created_at: user.created_at
        };

        // 🔐 Create JWT
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

        const token = jwt.sign(
            { id_user: user.id_user, username: user.username },
            JWT_SECRET,
            { expiresIn: '720h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout 
router.post('/logout', (req, res) => {
    // Since JWTs are stateless, we can't invalidate the token server-side,
    // but we can inform the client to remove the token.

    res.status(200).json({ message: 'Logout successful. Please remove the token from client-side.' });
});

// ----------

router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Get the user id from the JWT payload
        const userId = req.user.id_user;

        // Query the database to get the user data
        const [user] = await db.query(
            'SELECT id_user, `ho_ten`, username, email, phone, created_at FROM Users WHERE id_user = ?',
            [userId]
        );

        // If user is found, return user data
        if (user.length > 0) {
            return res.status(200).json({
                message: 'Profile data',
                user: user[0] // Return the first user (there should only be one)
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching profile:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

