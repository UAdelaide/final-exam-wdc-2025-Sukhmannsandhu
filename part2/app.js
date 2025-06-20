const express = require('express');
const pool = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');
const dogRoutes = require('./routes/dogRoutes');
const walkerRoutes = require('./routes/walkerRoutes');

const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working with MySQL2!' });
});

// Base routes
app.use('/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/walkers', walkerRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
