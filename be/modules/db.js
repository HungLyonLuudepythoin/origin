// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

// Create a MySQL connection pool using the environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Use DB_HOST from .env
  port: process.env.DB_PORT,  // Use DB_PORT from .env
  user: process.env.DB_USER,  // Use DB_USER from .env
  password: process.env.DB_PASSWORD,  // Use DB_PASSWORD from .env
  database: process.env.DB_DATABASE,  // Use DB_DATABASE from .env
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,  // Use DB_CONNECTION_LIMIT from .env
});

module.exports = pool;
