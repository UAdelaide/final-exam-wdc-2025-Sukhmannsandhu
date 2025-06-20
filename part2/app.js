const express = require('express');
const pool = require('./db'); // uses mysql2/promise
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.json({ message: 'Server is working with MySQL2 + Pool' });
});

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error('DB query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
