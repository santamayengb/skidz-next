// src/lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',      // replace with your database host
  user: 'root',   // replace with your database username
  password: 'root', // replace with your database password
  database: 'skidz_db', // replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
