const express = require('express');
const pool = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRequests');
const dogRoutes = require('./routes/dogRoutes');

const app = express();
const port = 8080;

app.use(express.json());

// Root route (test server)
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

// Custom API routes
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
// app.use('/api/walkers', walkerRoutes); ← You'll add this for Q8

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
})
