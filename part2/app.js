const express = require('express');
const pool = require('./models/db');
const app = express();
const port = 8080;

app.use(express.json());

// Test route to check server
app.get('/', (req, res) => {
  res.json({ message: 'Server is working with MySQL2!' });
});

// Users route (if you still want to test it)
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ Import walkrequests route for question 7
const walkRequestRoutes = require('./routes/walkrequests');
app.use('/api/walkrequests', walkRequestRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
