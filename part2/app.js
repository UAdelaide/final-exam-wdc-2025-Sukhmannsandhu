const express = require('express');
const path = require('path');
const pool = require('./models/db');

// Route files
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const walkRoutes = require('./routes/walkRequests'); // MAKE SURE THIS FILE EXISTS
const walkerRoutes = require('./routes/walkerRoutes');

const app = express();
const port = 8080;

// Middleware
app.use(express.json());

// ✅ Serve static HTML files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Homepage route – serve index.html from /public
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// ✅ API Routes
app.use('/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/walkers', walkerRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
