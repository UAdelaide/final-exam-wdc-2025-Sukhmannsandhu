const express = require('express');
const pool = require('./db');  // ✅ Make sure path is correct
const app = express();
const port = 8080;

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working with MySQL2!' });
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    console.log('📦 Users:', rows);
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});