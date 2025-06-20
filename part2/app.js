const express = require('express');
const pool = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');
const dogRoutes = require('./routes/dogRoutes');

const app = express();
const port = 8080;

app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working with MySQL2!' });
});

// Users test route
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

// ✅ Connect API routes
app.use('/api', userRoutes);
app.use('/api', walkRoutes);
app.use('/api', dogRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
