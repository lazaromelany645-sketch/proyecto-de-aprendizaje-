const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
<<<<<<< HEAD
  database: process.env.DB_NAME || 'veterinaria',
=======
  database: process.env.DB_NAME || 'cursis_virtuaels',
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = { pool };
